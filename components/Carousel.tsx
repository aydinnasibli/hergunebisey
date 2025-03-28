"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const images = [
    "https://i.imghippo.com/files/lHJF3703AU.jpg",
    "https://i.imghippo.com/files/IC6855dco.jpg",
    "https://i.imghippo.com/files/Ojrt3220EjA.jpg",
];

const CarouselMain: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden">
            {/* Image Container with 16:9 Aspect Ratio */}
            <div className="relative w-full aspect-[16/9]">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover rounded-3xl"
                            priority={index === 0} // Preload first image for better performance
                        />
                    </div>
                ))}
            </div>


        </div>
    );
};

export default CarouselMain;
