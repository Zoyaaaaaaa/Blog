'use client'

import { motion } from "framer-motion";
import Link from "next/link";

export default async function Home() {

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Animated Background Gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black rounded-3xl blur-3xl opacity-20"
        />

        {/* Main Content */}
        <div className="relative z-10 space-y-6">
          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold tracking-tight text-red-200"
          >
            Unleash Your Thoughts
          </motion.h1>

          {/* Animated Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-red-300 max-w-2xl mx-auto"
          >
            Create, Read, and Summarize Blogs with AI-Powered Insights
          </motion.p>

          {/* Animated Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-red-400 max-w-xl mx-auto"
          >
            Explore a platform where creativity meets technology. 
            Write, discover, and gain deep insights into content 
            through intelligent summarization.
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/blogs">
              <button className="mt-8 px-8 py-3 bg-red-900/30 text-red-200 rounded-full 
                hover:bg-red-900/50 border border-red-800 
                transition-all duration-300 ease-in-out 
                transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/50">
                Explore Blogs
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Subtle Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-red-900/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-900/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}