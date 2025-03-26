"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const SlideInFromLeft = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInViewSlide = useInView(ref, { once: true });


  return (
    <motion.div
      ref={ref}
      className=" "
      initial={{ x: "-100%" }} // Start off-screen
      animate={{ x: isInViewSlide ? 0 : "-100%" }} // Move in from the left when in view
      transition={{ duration: 1.5, ease: "easeOut" }}
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
    <div className="relative flex flex-col items-center space-y-80 py-40">
      <VerticalLine />
      <section className=" py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:grid-cols-2 gap-3 items-center">
          {/* Text Section */}
          <SlideInFromLeft>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold">Blog</h2>
              <p className="mt-4 text-lg text-gray-600">
                Welcome to our latest blog posts where we share insights and tips.
              </p>
            </div>
          </SlideInFromLeft>

          {/* Image Section */}
          <div className="text-center lg:text-right">
            <h2 className="text-4xl font-bold">Blog</h2>
            <p className="mt-4 text-lg text-gray-600">
              Welcome to our latest blog posts where we share insights and tips.
            </p>
          </div>
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
