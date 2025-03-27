"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import landscape from "./assets/landscape.jpg"

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
    <div className="relative flex flex-col items-center">

      <div className="text-center">
        <h1 className="text-gray-900 text-6xl font-light font-manrope leading-snug">
          Siteyi Keşfedin
        </h1>
        <p className="text-gray-500 text-lg mt-3">
          WelcomeWelcomeWelcomeWelcome
        </p>
      </div>


      <VerticalLine />
      <section className=" py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:grid-cols-2 gap-3 items-center">
          {/* Text Section */}
          <FadeIn>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold">Blog</h2>
              <p className="mt-4 text-lg text-gray-600">
                Welcome to our latest blog posts where we share insights and tips.
              </p>
            </div>

          </FadeIn>

          {/* Image Section */}
          <SlideInFromRight>
            <div className="flex justify-center w-full  ">
              <Image
                src={landscape}// Use a valid path (e.g., "/landscape.jpg" if it's in the 'public' folder)
                alt="Blog Image"
                className="rounded-3xl"
                layout="responsive"
                width={384}    // Width in pixels (defines aspect ratio)
                height={256}   // Height in pixels (defines aspect ratio)
              />
            </div>

          </SlideInFromRight>
        </div>
      </section>


      <section className="h-48 flex items-center justify-center">
        <h2 className="text-3xl">More Content</h2>
      </section>

      <VerticalLine />

      <section className="h-48 flex items-center justify-center">
        <h2 className="text-3xl">Keep Scrolling</h2>
      </section>

      <VerticalLine />
    </div>
  );
};

export default Home;
