"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Transform scroll progress into line height (0% to 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative">


      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">More Content</h2>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl">Keep Scrolling</h2>
      </section>
    </div>
  );
};

export default Home;
