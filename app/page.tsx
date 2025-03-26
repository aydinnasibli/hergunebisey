"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VerticalLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-[300px] flex justify-center">
      <motion.div
        className="w-[3px] bg-black min-h-[200px]"
        initial={{ height: "0%", opacity: 0 }}
        animate={{ height: isInView ? "100%" : "0%", opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative flex flex-col items-center space-y-80 py-40">
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </section>

      <VerticalLine />

      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">More Content</h2>
      </section>

      <VerticalLine />

      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">Keep Scrolling</h2>
      </section>

      <VerticalLine />
    </div>
  );
};

export default Home;
