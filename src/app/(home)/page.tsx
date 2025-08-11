"use client"
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6 relative">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-green-200 to-teal-300 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Streamline Your Business Operations
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Empower your team with a comprehensive CRM and inventory management platform. Simplify workflows, enhance productivity, and drive growth.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashbaord" passHref>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 shadow-md transition-all rounded-lg flex items-center justify-center">
              Start Free Trial
            </button>
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;