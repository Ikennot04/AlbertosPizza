'use client';

import localFont from "next/font/local";
import Navbar from "../components/navbar";
import { IoIosSearch } from "react-icons/io";
import { Product, initialProducts } from "../product/product";
import ProductCard from "../components/productCard";

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

export default function Menu() {
  return (
    <div>
      <Navbar />

      {/* Heading */}
      <div className="relative pt-20 px-4 sm:px-6 lg:px-8 mb-8">
        <div 
          className={`text-center sm:text-left sm:ml-12 text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[5rem] text-[#e75f06] leading-tight
                    [text-shadow:14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`} 
          style={{ letterSpacing: '0.1em' }}
        >
          A taste you'll
        </div>  

        <div 
          className={`text-center sm:text-left sm:ml-12 text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[5rem] text-[#e75f06] leading-tight mt-2
                    [text-shadow:14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`} 
          style={{ letterSpacing: '0.1em' }}
        >
          surely miss...
        </div>
      </div>

      {/* Search Input */}
      <div className="flex justify-center sm:justify-start sm:ml-32 px-4 sm:px-0 mt-8 sm:mt-12">
        <div className="relative w-full max-w-md">
          <IoIosSearch 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000]"
            size={24} 
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-4 pl-12 rounded-[50px] outline outline-2 outline-[#000000] shadow-md"
          />
        </div>
      </div>

      {/* Product Grid Layout */}
      <div className="mt-8 sm:mt-12 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto" style={{ maxWidth: '1200px' }}>
          {initialProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
