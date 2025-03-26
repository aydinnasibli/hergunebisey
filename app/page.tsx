"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VerticalLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects when the element enters the viewport

  return (
    <motion.div
      ref={ref}
      className="w-[3px] bg-black"
      initial={{ height: "0%", opacity: 0 }}
      animate={{ height: isInView ? "100%" : "0%", opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
};

const Home = () => {
  return (
    <div className="relative flex flex-col items-center space-y-40 py-20">
      {/* Scrollable Sections */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </section>

      {/* Vertical Line 1 */}
      <VerticalLine />

      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">More Content</h2>
      </section>

      {/* Vertical Line 2 */}
      <VerticalLine />

      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">Keep Scrolling</h2>
      </section>

      {/* Vertical Line 3 */}
      <VerticalLine />
    </div>
  );
};

export default Home;
