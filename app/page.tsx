"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import landscape from "./assets/landscape.jpg"
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
    <div className="relative flex flex-col items-center">

      <div className="text-center">
        <h1 className="text-gray-900 text-6xl font-light  leading-snug">
          Merhaba
        </h1>
        <p className="text-gray-500 text-lg text-justify px-28 mt-3 mb-10">
          Biz kafamızın içindekileri dökmek bunu yaparken de eğlenmek istedik ve böyle bir işe giriştik. Burada günlük hayat tecrübelerimizin bir sonucu ortaya çıkan ‘quote’lar paylaşıyor, zaman zaman blog yazıları yayınlıyoruz. Sadece yazıyla olmaz deyip zaman zaman da bi'podcast yayınlıyoruz.
        </p>
      </div>


      <VerticalLine />
      <section className="mt-10  mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:grid-cols-2 gap-3 items-center">
          {/* Text Section */}
          <FadeIn>
            <div className="text-center md:text-left">
              <h2 className="text-4xl ">Blog</h2>
              <p className="mt-4 text-lg mx-auto py-3 text-justify text-gray-600">
                Sitemizde geçmişten günümüze uzanan bir bilgi hazinesi sizleri bekliyor. Gizemli uygarlıklardan unutulmaz sanat eserlerine, bilimsel gelişmelerden teknolojinin harikalarına kadar geniş bir yelpazede ilgi çekici yazılar bulabilirsiniz.
              </p>
              <Link href="/podcast">
                <Button className="cursor-pointer transition-all duration-300 
                        hover:shadow-xl  hover:scale-110" variant={'default'}>Keşfet</Button>
              </Link>
            </div>

          </FadeIn>

          {/* Image Section */}
          <SlideInFromRight>
            <div className="flex justify-center w-full ">
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




      <VerticalLine />

      <section className="mt-10  mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:grid-cols-2 gap-3 items-center">
          {/* Image Section */}

          <SlideInFromLeft>
            <div className="flex justify-center w-full ">
              <Image
                src={landscape}// Use a valid path (e.g., "/landscape.jpg" if it's in the 'public' folder)
                alt="Blog Image"
                className="rounded-3xl"
                layout="responsive"
                width={384}    // Width in pixels (defines aspect ratio)
                height={256}   // Height in pixels (defines aspect ratio)
              />
            </div>

          </SlideInFromLeft>
          {/* Text Section */}
          <FadeIn>
            <div className="text-center md:text-left">
              <h2 className="text-4xl ">Podcast</h2>
              <p className="mt-4 text-lg text-justify py-10  text-gray-600">
                Aklımıza esen herhangi bir konuyu konuştuğumuz ve tartıştığımız öylesine bir podcast


              </p>
              <Link href="/podcast">
                <Button className="cursor-pointer" variant={'default'}>Dinle</Button>
              </Link>
            </div>

          </FadeIn>


        </div>
      </section>


      <VerticalLine />
      <section className="mt-10  mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:grid-cols-2 gap-3 items-center">
          {/* Text Section */}
          <FadeIn>
            <div className="text-center md:text-left">
              <h2 className="text-4xl ">Quote</h2>
              <p className="mt-4 text-lg mx-auto py-10 text-justify text-gray-600">
                Günlük,aylık ve yıllık olarak quotelar paylaştığımız yer
              </p>
              <Link href="/podcast">
                <Button className="cursor-pointer" variant={'default'}>Daha fazla</Button>
              </Link>
            </div>

          </FadeIn>

          {/* Image Section */}
          <SlideInFromRight>
            <div className="flex justify-center w-full ">
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
    </div>
  );
};

export default Home;
