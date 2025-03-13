'use client';

import Navbar from "@/app/components/navbar";
import React, { useState } from "react";
import Link from "next/link";
import { Product, initialProducts } from "../product/product";
import localFont from 'next/font/local';

const kaushanScript = localFont({
  src: '../../public/fonts/Kaushan_Script/KaushanScript-Regular.ttf',
  display: 'swap',
});

const bernoru = localFont({
  src: '../../public/fonts/bernoru_font/bernoru-blackultraexpanded.otf',
  display: 'swap',
  weight: '900',
  style: 'normal',
});

export default function Homepage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 p-5">
        <div className="relative w-full">
          <div className="relative min-h-[80vh] flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/5 relative pl-4">
              <div className={`text-[4rem] sm:text-[5rem] lg:text-[6rem] text-[#e75f06] mt-8 lg:mt-32 leading-none whitespace-nowrap
                  [text-shadow:4px_4px_8px_rgba(231,95,6,0.3),14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`}
                  style={{ letterSpacing: '0.1em' }}>
                A taste you'll
              </div>

              <div className={`text-[4rem] sm:text-[5rem] lg:text-[6rem] text-[#e75f06] mt-6 leading-none whitespace-nowrap
                  [text-shadow:4px_4px_8px_rgba(231,95,6,0.3),14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`}
                  style={{ letterSpacing: '0.2em' }}>
                surely miss...
              </div>

              <div className="mt-12 lg:mt-16">
                <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
                  <div className="inline-flex items-center justify-center">
                  <h2 className={`text-[1.25rem] xs:text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-black text-[#4b3025] uppercase ${bernoru.className} mb-3 sm:mb-4 md:mb-5 tracking-tight whitespace-nowrap text-center`}
                      style={{
                        letterSpacing: '-0.02em',
                        lineHeight: '1',
                        textShadow: 'calc(0.1em/7) calc(0.1em/7) calc(0.2em/7) rgba(75,48,37,0.25), calc(0.2em/7) calc(0.2em/7) calc(0.4em/7) rgba(0,0,0,0.175)',
                      }}>
                      FREE DELIVERY FEE!
                  </h2>
                  </div>
                </div>
                <h2 className={`text-[0.65rem] sm:text-[0.75rem] font-black text-[#4b3025] uppercase ${bernoru.className} mb-6`}
                    style={{ letterSpacing: '0.4em', lineHeight: '1', textShadow: '1px 1px 2px rgba(0,0,0,0.03)' }}>
                  NO MINIMUM ORDER REQUIRED IN CERTAIN AREAS
                </h2>
                <div className="flex gap-4 ml-8 sm:ml-12 lg:ml-20 xl:ml-24 mt-6">
                <Link href={"/menu"}>
                  <button className="px-6 py-3 bg-[#df961a] text-white rounded-full font-semibold hover:bg-[#e67a0e] hover:scale-105 hover:shadow-xl transition-all duration-200 shadow-md whitespace-nowrap">
                    View Menu
                  </button>
                  </Link>
                 
                  
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/5 mt-8 sm:mt-12 lg:mt-0 lg:pl-12">
              <div className="flex flex-col items-center pt-4">
                <div className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="relative w-[95%] h-[95%] flex items-center justify-center">
                      <img
                        key={currentIndex}
                        src={products[currentIndex].image}
                        alt={products[currentIndex].name}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-500 ease-in-out hover:scale-105 animate-fadeIn"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
                  <button
                    onClick={prevProduct}
                    className="px-3 sm:px-4 py-2 text-4xl md:text-6xl lg:text-7xl text-[#4b3025] hover:text-[#e75f06] hover:scale-110 transition-all duration-200"
                  >
                    &lt;
                  </button>
                  <span
                    key={currentIndex}
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#4b3025] hover:text-[#e75f06] ${kaushanScript.className} whitespace-nowrap translate-y-1 transition-colors duration-200 animate-fadeIn`}
                  >
                    {products[currentIndex].name}
                  </span>
                  <button
                    onClick={nextProduct}
                    className="px-3 sm:px-4 py-2 text-4xl md:text-6xl lg:text-7xl text-[#4b3025] hover:text-[#e75f06] hover:scale-110 transition-all duration-200"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
