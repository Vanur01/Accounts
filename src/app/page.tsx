"use client"
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Container animation variants
  const containerVariants = {
    idle: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 35px 80px -12px rgba(0, 0, 0, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -40,
      filter: "blur(8px)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }
    }
  };

  // Main text animation variants
  const mainTextVariants = {
    centered: {
      opacity: 1,
      x: 48,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    shifted: {
      opacity: 0,
      x: 30,
      scale: 0.95,
      filter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Image animation variants
  const imageVariants = {
    left: {
      left: "12px",
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8
      }
    },
    right: {
      left: "calc(100% - 96px)",
      rotate: 360,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8
      }
    }
  };

  // Background glow animation
  const glowVariants = {
    idle: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-500/20 rounded-full blur-xl"
          variants={glowVariants}
          animate={isHovered ? "active" : "idle"}
        />
        
        {/* Main container */}
        <motion.div
          variants={containerVariants}
          animate={isPressed ? "tap" : isHovered ? "hover" : "idle"}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onTapStart={() => setIsPressed(true)}
          onTap={() => setIsPressed(false)}
          onTapCancel={() => setIsPressed(false)}
          className="relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-full mx-auto cursor-pointer overflow-hidden border border-zinc-700/50 backdrop-blur-sm"
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl relative">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
              animate={{
                x: isHovered ? ["-100%", "200%"] : "-100%"
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            />

            <div className="relative px-8 py-4 sm:px-12 sm:py-6 lg:px-16 lg:py-8">
              {/* Left side text - appears on hover */}
              <motion.div
                variants={textVariants}
                animate={isHovered ? "visible" : "hidden"}
                className="absolute left-8 sm:left-12 lg:left-16 top-1/2 transform -translate-y-1/2 z-20"
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-bold text-white mb-1"
                  variants={textVariants}
                >
                  Ready?
                </motion.h2>
                <motion.p 
                  className="text-white/70 text-sm"
                  variants={textVariants}
                >
                  Let's order!
                </motion.p>
              </motion.div>

              {/* Main centered text */}
              <motion.div
                variants={mainTextVariants}
                animate={isHovered ? "shifted" : "centered"}
                className="text-center flex-1 relative z-10 pr-16 sm:pr-20 lg:pr-24"
              >
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                  Start Your Order
                </h1>
                <p className="text-white/70 text-sm sm:text-base">
                  Fresh food delivered to your door
                </p>
              </motion.div>

              {/* Animated food icon */}
              <motion.div
                variants={imageVariants}
                animate={isHovered ? "right" : "left"}
                className="absolute top-1/2 transform -translate-y-1/2 z-30"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-white to-zinc-100 rounded-full p-3 shadow-2xl border border-white/20"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                    animate={isHovered ? {
                      background: ["linear-gradient(45deg, #fbbf24, #f97316)", "linear-gradient(45deg, #f97316, #dc2626)", "linear-gradient(45deg, #fbbf24, #f97316)"]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        rotate: isHovered ? [0, 15, -15, 0] : 0 
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: isHovered ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      🍔
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Progress indicator */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8 
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={{
                        scale: isHovered ? [1, 1.5, 1] : 1,
                        opacity: isHovered ? [0.4, 1, 0.4] : 0.4
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;