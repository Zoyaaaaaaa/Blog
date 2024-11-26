

'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';
import BlogCards from '@/components/BlogCards';
interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  type:string;
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
          Narrative Canvas
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
          <BlogCards blogs={blogs} />
        )}
      </div>
    </div>
  );
};

export default BlogsPage;