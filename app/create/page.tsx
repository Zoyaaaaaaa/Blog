// 'use client'
// import React, { useState, useEffect } from 'react';
// import { createClient } from "@/utils/supabase/client";
// import { motion } from 'framer-motion';
// import { Pen, Trash2, BookOpen } from 'lucide-react';

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   user_id: string;
// }

// const BlogComponent: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [userId, setUserId] = useState<string>('');
//   const [editMode, setEditMode] = useState(false);
//   const [currentId, setCurrentId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = createClient();
//       const { data: { user } } = await supabase.auth.getUser();

//       if (!user) {
//         window.location.href = "/sign-in";
//       } else {
//         setUserId(user.id);
//       }
//     };

//     fetchUser();
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const supabase = createClient();
      
//       // Get the current user
//       const { data: { user } } = await supabase.auth.getUser();
      
//       // Check if the user is logged in
//       if (!user) {
//         setError('User not logged in.');
//         return;
//       }
      
//       // Fetch blogs that the current user has created
//       const { data, error } = await supabase
//         .from('blogs')
//         .select('*')
//         .eq('user_id', user.id);  // Assuming blogs have a 'user_id' field that stores the creator's ID
  
//       if (error) throw new Error(error.message);
      
//       setBlogs(data);
//     } catch (error) {
//       setError('Error fetching blogs.');
//     }
//   };
  

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !content) return setError('Title and content are required.');

//     try {
//       const response = await fetch('/api/blogs', {
//         method: editMode ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, content, user_id: userId }),
//       });

//       if (!response.ok) throw new Error('Failed to save the blog');

//       await fetchBlogs();
//       resetForm();
//     } catch (error: any) {
//       setError(error.message || 'Error saving the blog.');
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const supabase = createClient();
//       await supabase.from('blogs').delete().eq('id', id);
//       await fetchBlogs();
//     } catch (error: any) {
//       setError(error.message || 'Error deleting the blog.');
//     }
//   };

//   const handleEdit = (blog: Blog) => {
//     setTitle(blog.title);
//     setContent(blog.content);
//     setCurrentId(blog.id);
//     setEditMode(true);
//   };

//   const resetForm = () => {
//     setTitle('');
//     setContent('');
//     setCurrentId(null);
//     setEditMode(false);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-4xl space-y-8 bg-neutral-900 shadow-2xl shadow-red-900/30 rounded-2xl p-10"
//       >
//         <h1 className="text-4xl font-extralight text-center text-white mb-8 border-b pb-4 border-neutral-700">
//           Blog Studio
//         </h1>

//         {error && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 text-center"
//           >
//             {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input 
//             type="text" 
//             placeholder="Blog Title" 
//             value={title} 
//             onChange={(e) => setTitle(e.target.value)} 
//             className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl focus:ring-2 focus:ring-red-600 transition-all duration-300"
//           />
//           <textarea 
//             placeholder="Write your story..." 
//             value={content} 
//             onChange={(e) => setContent(e.target.value)} 
//             className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl h-40 resize-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
//           />
//           <div className="flex space-x-4">
//             <button 
//               type="submit" 
//               className="w-full bg-red-800 text-white py-3 rounded-xl hover:bg-red-700 transition-colors duration-300"
//             >
//               {editMode ? 'Update Post' : 'Publish'}
//             </button>
//             {editMode && (
//               <button 
//                 type="button" 
//                 onClick={resetForm}
//                 className="w-full bg-neutral-800 text-neutral-300 py-3 rounded-xl hover:bg-neutral-700 transition-colors duration-300"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//         {blogs && blogs.length === 0 ? (
//   <p className="text-center text-neutral-400 text-lg md:text-xl font-semibold py-8 bg-neutral-900 rounded-lg shadow-lg max-w-md mx-auto">
//     No stories by you yet...
//   </p>
// )  :blogs.map((blog, index) => (
//             <motion.div
//               key={blog.id}
//               initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
//               animate={{ opacity: 1, y: 0, rotate: 0 }}
//               transition={{ 
//                 duration: 0.4, 
//                 delay: index * 0.1,
//                 type: "spring",
//                 stiffness: 100
//               }}
//               className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 group relative overflow-hidden transform transition-all hover:scale-105"
//             >
//               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
//               <BookOpen size={24} className="absolute top-4 right-4 text-red-600 opacity-50" />
//               <h3 className="text-2xl font-light text-white mb-3 pr-10">{blog.title}</h3>
//               <p className="text-neutral-400 mb-4 line-clamp-3">{blog.content}</p>
//               <div className="flex justify-between items-center mt-6">
//                 <span className="text-xs text-neutral-500">
//                   {new Date().toLocaleDateString()}
//                 </span>
//                 <div className="flex space-x-3">
//                   <button 
//                     onClick={() => handleEdit(blog)}
//                     className="text-neutral-400 hover:text-white flex items-center transition-colors"
//                   >
//                     <Pen size={16} className="mr-1" /> Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(blog.id)}
//                     className="text-red-500 hover:text-red-400 flex items-center transition-colors"
//                   >
//                     <Trash2 size={16} className="mr-1" /> Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default BlogComponent;
'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { motion } from 'framer-motion';
import { Pen, Trash2, BookOpen } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  content: string;
  user_id: string;
  type: string; // Add the type field to the Blog interface
}

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState(''); // New state for type
  const [userId, setUserId] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/sign-in";
      } else {
        setUserId(user.id);
      }
    };

    fetchUser();
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not logged in.');
        return;
      }
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);
      
      setBlogs(data);
    } catch (error) {
      setError('Error fetching blogs.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !type) return setError('Title, content, and type are required.');

    try {
      const response = await fetch('/api/blogs', {
        method: editMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, type, user_id: userId }), // Include type in the request body
      });

      if (!response.ok) throw new Error('Failed to save the blog');

      await fetchBlogs();
      resetForm();
    } catch (error: any) {
      setError(error.message || 'Error saving the blog.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const supabase = createClient();
      await supabase.from('blogs').delete().eq('id', id);
      await fetchBlogs();
    } catch (error: any) {
      setError(error.message || 'Error deleting the blog.');
    }
  };

  const handleEdit = (blog: Blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setType(blog.type); 
    setCurrentId(blog.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setType(''); // Reset the type
    setCurrentId(null);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8 bg-neutral-900 shadow-2xl shadow-red-900/30 rounded-2xl p-10"
      >
        <h1 className="text-4xl font-extralight text-center text-white mb-8 border-b pb-4 border-neutral-700">
          Blog Studio
        </h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            placeholder="Blog Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl focus:ring-2 focus:ring-red-600 transition-all duration-300"
          />
          <textarea 
            placeholder="Write your story..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl h-40 resize-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
          />
          {/* Add select dropdown for type */}
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl focus:ring-2 focus:ring-red-600 transition-all duration-300"
          >
            <option value="">Select Type</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>

          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="w-full bg-red-800 text-white py-3 rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              {editMode ? 'Update Post' : 'Publish'}
            </button>
            {editMode && (
              <button 
                type="button" 
                onClick={resetForm}
                className="w-full bg-neutral-800 text-neutral-300 py-3 rounded-xl hover:bg-neutral-700 transition-colors duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogs.length === 0 ? (
            <p className="text-center text-neutral-400 text-lg md:text-xl font-semibold py-8 bg-neutral-900 rounded-lg shadow-lg max-w-md mx-auto">
              No stories by you yet...
            </p>
          ) : (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 group relative overflow-hidden transform transition-all hover:scale-105"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                <BookOpen size={24} className="absolute top-4 right-4 text-red-600 opacity-50" />
                <h3 className="text-2xl font-light text-white mb-3 pr-10">{blog.title}</h3>
                <p className="text-neutral-400 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xs text-neutral-500">
                    {new Date().toLocaleDateString()}
                  </span>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleEdit(blog)}
                      className="text-neutral-400 hover:text-white flex items-center transition-colors"
                    >
                      <Pen size={16} className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500 hover:text-red-400 flex items-center transition-colors"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogComponent;
