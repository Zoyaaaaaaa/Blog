'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setBlogs(data || []);
        setIsLoading(false);
      } catch (err: any) {
        setError('Failed to unveil stories');
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchBlogs();
  }, []);

  const truncateText = (text: string, maxLength: number = 200) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-neutral-900 to-red-950 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            bounce: 0.5 
          }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white tracking-widest flex items-center space-x-4"
        >
          <BookOpen size={64} className="text-red-600" />
          <span>Crafting Narratives...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-neutral-900 to-red-950">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-4xl font-light text-red-600 text-center px-8"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-red-950 py-20 px-6 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-8xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white mb-20 tracking-tighter"
        >
          Narrative Nexus
        </motion.h1>

        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl font-light text-red-500 py-16"
          >
            No stories yet. Be the first to ignite the narrative.
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, staggerChildren: 0.1 }}
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(239, 68, 68, 0.4)"
                  }}
                  className="bg-neutral-900/80 border-2 border-red-900/40 rounded-3xl p-8 
                             transform transition-all duration-300 
                             hover:border-red-600 
                             shadow-2xl hover:shadow-red-900/50"
                >
                  <div className="h-full flex flex-col space-y-6">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white mb-2 line-clamp-2 leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-neutral-300 text-lg mb-4 flex-grow line-clamp-4">
                      {truncateText(blog.content, 250)}
                    </p>
                    <div className="flex justify-between items-center text-base text-neutral-300">
                      <div className="flex items-center space-x-3">
                        <Clock size={20} className="text-red-500" />
                        <span className="font-medium">{formatDate(blog.created_at)}</span>
                      </div>
                      <button className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-all font-semibold group">
                        <span className="group-hover:tracking-wider transition-all">Explore</span>
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;