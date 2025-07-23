import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LazyLoadProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  fallback?: ReactNode;
}

export function LazyLoad({
  children,
  delay = 100,
  threshold = 0.1,
  className = "",
  fallback = null,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
          // Add delay before showing content
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold },
    );

    const element = document.getElementById("lazy-load-trigger");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold, hasIntersected]);

  return (
    <div className={className}>
      <div id="lazy-load-trigger" className="h-1" />
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        ) : (
          fallback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {fallback}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProgressiveLoadProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function ProgressiveLoad({
  children,
  staggerDelay = 100,
  className = "",
}: ProgressiveLoadProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <LazyLoad key={index} delay={index * staggerDelay} className="mb-4">
          {child}
        </LazyLoad>
      ))}
    </div>
  );
}
