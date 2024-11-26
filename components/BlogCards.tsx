
// 'use client';
// import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useOutsideClick } from "@/hooks/use-outside-click";
// import { Pen } from 'lucide-react';

// interface Blog {
//     id: number;
//     title: string;
//     content: string;
//     created_at: string;
//     user_id: string;
// }

// interface BlogCardsProps {
//     blogs: Blog[];
// }

// export default function BlogCards({ blogs }: BlogCardsProps) {
//     const [active, setActive] = useState<Blog | null>(null);
//     const [summary, setSummary] = useState<string>(""); 
//     const id = useId();
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         function onKeyDown(event: KeyboardEvent) {
//             if (event.key === "Escape") {
//                 setActive(null);
//             }
//         }
//         document.body.style.overflow = active ? "hidden" : "auto";
//         window.addEventListener("keydown", onKeyDown);
//         return () => window.removeEventListener("keydown", onKeyDown);
//     }, [active]);

//     useOutsideClick(ref, () => setActive(null));

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     const truncateText = (text: string, maxLength: number = 150) => {
//         return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//     };

//     const summarize = async () => {
//         if (active && active.content) {
//             try {
//                 setSummary("Generating summary...");
    
//                 const response = await fetch("/api/summary", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ 
//                         content: active.content.substring(0, 2000)
//                     }),
//                 });
    
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
    
//                 const data = await response.json();
    
//                 if (data && (data.result || data.text)) {
//                     setSummary(data.result || data.text);
//                 } else {
//                     setSummary('Could not generate summary');
//                 }
    
//             } catch (error) {
//                 console.error("Summarization error:", error);
//                 setSummary(
//                     error instanceof Error 
//                         ? `Error: ${error.message}` 
//                         : "An unexpected error occurred"
//                 );
//             }
//         } else {
//             setSummary("No content available to summarize.");
//         }
//     };

//     return (
//         <>
//             <AnimatePresence>
//                 {active && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-10"
//                     />
//                 )}
//             </AnimatePresence>
//             <AnimatePresence>
//                 {active && (
//                     <div className="fixed inset-0 grid place-items-center z-[100]">
//                         <motion.button
//                             key={`button-${active.id}-${id}`}
//                             layout
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0, transition: { duration: 0.05 } }}
//                             className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-red-900/80 text-white rounded-full h-8 w-8 hover:bg-red-800 transition-colors"
//                             onClick={() => setActive(null)}
//                         >
//                             <CloseIcon />
//                         </motion.button>
//                         <motion.div
//                             layoutId={`card-${active.id}-${id}`}
//                             ref={ref}
//                             className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-black/90 border-2 border-red-900 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/50"
//                         >
//                             <div className="p-6 bg-gradient-to-br from-black via-black to-red-900/20">
//                                 <motion.h3
//                                     layoutId={`title-${active.id}-${id}`}
//                                     className="font-bold text-red-200 text-2xl mb-2 tracking-wide"
//                                 >
//                                     {active.title}
//                                 </motion.h3>
//                                 <motion.p
//                                     layoutId={`date-${active.id}-${id}`}
//                                     className="text-red-400 text-sm mb-4"
//                                 >
//                                     {formatDate(active.created_at)}
//                                 </motion.p>
//                                 <motion.div
//                                     layout
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                     className="text-red-100 text-base overflow-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-track-black scrollbar-thumb-red-900"
//                                 >
//                                     {active.content}
//                                 </motion.div>
//                                 {summary && (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         exit={{ opacity: 0 }}
//                                         className="mt-4 text-red-200 text-base"
//                                     >
//                                         <h4 className="font-semibold text-red-300">Summary:</h4>
//                                         <p>{summary}</p>
//                                     </motion.div>
//                                 )}
//                                 <motion.button
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                     className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-200 rounded-full hover:bg-red-900/50 transition-colors border border-red-800"
//                                     onClick={summarize}
//                                 >
//                                     <Pen size={16} className="text-red-300" />
//                                     <span>Summarize</span>
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>
//             <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-black/95">
//                 {blogs.map((blog) => (
//                     <motion.li
//                         layoutId={`card-${blog.id}-${id}`}
//                         key={blog.id}
//                         onClick={() => setActive(blog)}
//                         className="bg-red-900/10 border border-red-900/30 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-800 transform hover:scale-105"
//                     >
//                         <div className="p-6 bg-gradient-to-br from-black/50 to-red-900/10">
//                             <motion.h3
//                                 layoutId={`title-${blog.id}-${id}`}
//                                 className="font-bold text-red-200 text-xl mb-2 line-clamp-1 tracking-wide"
//                             >
//                                 {blog.title}
//                             </motion.h3>
//                             <motion.p
//                                 layoutId={`date-${blog.id}-${id}`}
//                                 className="text-red-400 text-sm mb-2"
//                             >
//                                 {formatDate(blog.created_at)}
//                             </motion.p>
//                             <p className="text-red-100 text-sm line-clamp-3">
//                                 {truncateText(blog.content)}
//                             </p>
//                         </div>
//                     </motion.li>
//                 ))}
//             </ul>
//         </>
//     );
// }

// const CloseIcon = () => {
//     return (
//         <motion.svg
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, transition: { duration: 0.05 } }}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-4 w-4 text-white"
//         >
//             <path d="M18 6L6 18" />
//             <path d="M6 6l12 12" />
//         </motion.svg>
//     );
// };
// 'use client';
// import React, { useEffect, useId, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useOutsideClick } from "@/hooks/use-outside-click";
// import { Pen } from 'lucide-react';

// interface Blog {
//     id: number;
//     title: string;
//     content: string;
//     created_at: string;
//     user_id: string;
// }

// interface BlogCardsProps {
//     blogs: Blog[];
// }

// export default function BlogCards({ blogs }: BlogCardsProps) {
//     const [active, setActive] = useState<Blog | null>(null);
//     const [summary, setSummary] = useState<string>(""); 
//     const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search query
//     const id = useId();
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         function onKeyDown(event: KeyboardEvent) {
//             if (event.key === "Escape") {
//                 setActive(null);
//             }
//         }
//         document.body.style.overflow = active ? "hidden" : "auto";
//         window.addEventListener("keydown", onKeyDown);
//         return () => window.removeEventListener("keydown", onKeyDown);
//     }, [active]);

//     useOutsideClick(ref, () => setActive(null));

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     const truncateText = (text: string, maxLength: number = 150) => {
//         return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//     };

//     const summarize = async () => {
//         if (active && active.content) {
//             try {
//                 setSummary("Generating summary...");
    
//                 const response = await fetch("/api/summary", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ 
//                         content: active.content.substring(0, 2000)
//                     }),
//                 });
    
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
    
//                 const data = await response.json();
    
//                 if (data && (data.result || data.text)) {
//                     setSummary(data.result || data.text);
//                 } else {
//                     setSummary('Could not generate summary');
//                 }
    
//             } catch (error) {
//                 console.error("Summarization error:", error);
//                 setSummary(
//                     error instanceof Error 
//                         ? `Error: ${error.message}` 
//                         : "An unexpected error occurred"
//                 );
//             }
//         } else {
//             setSummary("No content available to summarize.");
//         }
//     };

//     // Filter blogs based on search query
//     const filteredBlogs = blogs.filter((blog) =>
//         blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         blog.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <>
//             <AnimatePresence>
//                 {active && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-10"
//                     />
//                 )}
//             </AnimatePresence>
//             <AnimatePresence>
//                 {active && (
//                     <div className="fixed inset-0 grid place-items-center z-[100]">
//                         <motion.button
//                             key={`button-${active.id}-${id}`}
//                             layout
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0, transition: { duration: 0.05 } }}
//                             className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-red-900/80 text-white rounded-full h-8 w-8 hover:bg-red-800 transition-colors"
//                             onClick={() => setActive(null)}
//                         >
//                             <CloseIcon />
//                         </motion.button>
//                         <motion.div
//                             layoutId={`card-${active.id}-${id}`}
//                             ref={ref}
//                             className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-black/90 border-2 border-red-900 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/50"
//                         >
//                             <div className="p-6 bg-gradient-to-br from-black via-black to-red-900/20">
//                                 <motion.h3
//                                     layoutId={`title-${active.id}-${id}`}
//                                     className="font-bold text-red-200 text-2xl mb-2 tracking-wide"
//                                 >
//                                     {active.title}
//                                 </motion.h3>
//                                 <motion.p
//                                     layoutId={`date-${active.id}-${id}`}
//                                     className="text-red-400 text-sm mb-4"
//                                 >
//                                     {formatDate(active.created_at)}
//                                 </motion.p>
//                                 <motion.div
//                                     layout
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                     className="text-red-100 text-base overflow-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-track-black scrollbar-thumb-red-900"
//                                 >
//                                     {active.content}
//                                 </motion.div>
//                                 {summary && (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         exit={{ opacity: 0 }}
//                                         className="mt-4 text-red-200 text-base"
//                                     >
//                                         <h4 className="font-semibold text-red-300">Summary:</h4>
//                                         <p>{summary}</p>
//                                     </motion.div>
//                                 )}
//                                 <motion.button
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                     className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-200 rounded-full hover:bg-red-900/50 transition-colors border border-red-800"
//                                     onClick={summarize}
//                                 >
//                                     <Pen size={16} className="text-red-300" />
//                                     <span>Summarize</span>
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     </div>
//                 )}
//             </AnimatePresence>

//             {/* Search Input */}
//             <div className="p-8">
//                 <input
//                     type="text"
//                     placeholder="Search for blogs..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full p-2 bg-black/80 text-white rounded-lg border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900"
//                 />
//             </div>

//             <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-black/95">
//                 {filteredBlogs.length === 0 ? (
//                     <motion.div className="col-span-full text-center text-red-300 text-lg">
//                         No blogs found for your search.
//                     </motion.div>
//                 ) : (
//                     filteredBlogs.map((blog) => (
//                         <motion.li
//                             layoutId={`card-${blog.id}-${id}`}
//                             key={blog.id}
//                             onClick={() => setActive(blog)}
//                             className="bg-red-900/10 border border-red-900/30 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-800 transform hover:scale-105"
//                         >
//                             <div className="p-6 bg-gradient-to-br from-black/50 to-red-900/10">
//                                 <motion.h3
//                                     layoutId={`title-${blog.id}-${id}`}
//                                     className="font-bold text-red-200 text-xl mb-2 line-clamp-1 tracking-wide"
//                                 >
//                                     {blog.title}
//                                 </motion.h3>
//                                 <motion.p
//                                     layoutId={`date-${blog.id}-${id}`}
//                                     className="text-red-400 text-sm mb-2"
//                                 >
//                                     {formatDate(blog.created_at)}
//                                 </motion.p>
//                                 <p className="text-red-100 text-sm line-clamp-3">
//                                     {truncateText(blog.content)}
//                                 </p>
//                             </div>
//                         </motion.li>
//                     ))
//                 )}
//             </ul>
//         </>
//     );
// }

// const CloseIcon = () => {
//     return (
//         <motion.svg
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, transition: { duration: 0.05 } }}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-4 w-4 text-white"
//         >
//             <path d="M18 6L6 18" />
//             <path d="M6 6l12 12" />
//         </motion.svg>
//     );
// };

'use client';
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Pen } from 'lucide-react';

interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
    type: string;  // Add type field here
}

interface BlogCardsProps {
    blogs: Blog[];
}

export default function BlogCards({ blogs }: BlogCardsProps) {
    const [active, setActive] = useState<Blog | null>(null);
    const [summary, setSummary] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>('');  // State for search query
    const [selectedType, setSelectedType] = useState<string>(''); // State for selected type
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }
        document.body.style.overflow = active ? "hidden" : "auto";
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength: number = 150) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const summarize = async () => {
        if (active && active.content) {
            try {
                setSummary("Generating summary...");
    
                const response = await fetch("/api/summary", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        content: active.content.substring(0, 2000)
                    }),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (data && (data.result || data.text)) {
                    setSummary(data.result || data.text);
                } else {
                    setSummary('Could not generate summary');
                }
    
            } catch (error) {
                console.error("Summarization error:", error);
                setSummary(
                    error instanceof Error 
                        ? `Error: ${error.message}` 
                        : "An unexpected error occurred"
                );
            }
        } else {
            setSummary("No content available to summarize.");
        }
    };

    // Filter blogs based on search query and selected type
    const filteredBlogs = blogs.filter((blog) =>
        (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedType ? blog.type.toLowerCase() === selectedType.toLowerCase() : true) // Filter by selected type
    );

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.id}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-red-900/80 text-white rounded-full h-8 w-8 hover:bg-red-800 transition-colors"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.id}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-black/90 border-2 border-red-900 rounded-3xl overflow-hidden shadow-2xl shadow-red-900/50"
                        >
                            <div className="p-6 bg-gradient-to-br from-black via-black to-red-900/20">
                                <motion.h3
                                    layoutId={`title-${active.id}-${id}`}
                                    className="font-bold text-red-200 text-2xl mb-2 tracking-wide"
                                >
                                    {active.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`date-${active.id}-${id}`}
                                    className="text-red-400 text-sm mb-4"
                                >
                                    {formatDate(active.created_at)}
                                </motion.p>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-100 text-base overflow-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-track-black scrollbar-thumb-red-900"
                                >
                                    {active.content}
                                </motion.div>
                                {summary && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 text-red-200 text-base"
                                    >
                                        <h4 className="font-semibold text-red-300">Summary:</h4>
                                        <p>{summary}</p>
                                    </motion.div>
                                )}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-900/30 text-red-200 rounded-full hover:bg-red-900/50 transition-colors border border-red-800"
                                    onClick={summarize}
                                >
                                    <Pen size={16} className="text-red-300" />
                                    <span>Summarize</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Search Input */}
            <div className="p-8">
                <input
                    type="text"
                    placeholder="Search for blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 bg-black/80 text-white rounded-lg border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900"
                />
            </div>

            {/* Type Filter Dropdown */}
            <div className="p-8">
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 bg-black/80 text-white rounded-lg border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-900"
                >
                    <option value="">Filter by Type</option>
                    <option value="technology">Technology</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="finance">Finance</option>
                    <option value="entertainment">Entertainment</option>
                </select>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-black/95">
                {filteredBlogs.length === 0 ? (
                    <motion.div className="col-span-full text-center text-red-300 text-lg">
                        No blogs found for your search and filter criteria.
                    </motion.div>
                ) : (
                    filteredBlogs.map((blog) => (
                        <motion.li
                            layoutId={`card-${blog.id}-${id}`}
                            key={blog.id}
                            onClick={() => setActive(blog)}
                            className="bg-red-900/10 border border-red-900/30 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-800 transform hover:scale-105"
                        >
                            <div className="p-6 bg-gradient-to-br from-black/50 to-red-900/10">
                                <motion.h3
                                    layoutId={`title-${blog.id}-${id}`}
                                    className="font-bold text-red-200 text-xl mb-2 line-clamp-1 tracking-wide"
                                >
                                    {blog.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`date-${blog.id}-${id}`}
                                    className="text-red-400 text-sm mb-2"
                                >
                                    {formatDate(blog.created_at)}
                                </motion.p>
                                <p className="text-red-100 text-sm line-clamp-3">
                                    {truncateText(blog.content)}
                                </p>
                                <p className="text-red-300 text-xs mt-2">Type: {blog.type}</p> {/* Display blog type */}
                            </div>
                        </motion.li>
                    ))
                )}
            </ul>
        </>
    );
}

const CloseIcon = () => {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
        >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};
