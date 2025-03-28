"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import landscape from '../public/assets/landscape.jpg'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SlideInFromRight = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInViewSlide = useInView(ref, { once: true });


  return (
    <motion.div
      ref={ref}
      className=" "
      initial={{ x: "50%" }} // Start off-screen
      animate={{ x: isInViewSlide ? 0 : "100%" }} // Move in from the left when in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
const SlideInFromLeft = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInViewSlide = useInView(ref, { once: true });

  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden" // Start hidden
      animate={isInViewSlide ? "visible" : "hidden"} // Animate only if in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};



const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInViewFade = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className=" "
      initial={{ opacity: 0 }} // Start with opacity 0 (invisible)
      animate={{ opacity: isInViewFade ? 1 : 0 }} // Fade in to opacity 1 when in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};


const VerticalLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-64 flex justify-center">
      <motion.div
        className="w-[3px] bg-black min-h-[0px]"
        initial={{ height: "0%", opacity: 0 }}
        animate={{ height: isInView ? "100%" : "0%", opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const Home = () => {
  return (
    <div>

    </div>
  );
};

export default Home;
