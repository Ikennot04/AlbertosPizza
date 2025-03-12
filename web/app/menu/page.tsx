'use client';

import localFont from "next/font/local";
import Navbar from "../components/navbar";
import { IoIosSearch } from "react-icons/io";
import { Product, initialProducts } from "../product/product";

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
      <div 
        className={`absolute left-16 -top-10 text-[4rem] sm:text-[5rem] text-[#e75f06] mt-32 leading-none
                    [text-shadow:14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`} 
        style={{ letterSpacing: '0.1em' }}
      >
        A taste you'll
      </div>  

      <div 
        className={`absolute left-16 top-10 text-[4rem] sm:text-[5rem] text-[#e75f06] mt-32 leading-none
                    [text-shadow:14px_14px_28px_rgba(0,0,0,0.15)] ${kaushanScript.className}`} 
        style={{ letterSpacing: '0.2em' }}
      >
        surely miss...
      </div>

      {/* Search Input */}
      <div className="flex justify-start ml-32 mt-[300px] relative">
        <IoIosSearch 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#000000]"
          size={24} 
        />
        <input
          type="text"
          placeholder="Search..."
          className="p-4 pl-12 rounded-[50px] outline outline-2 outline-[#000000] shadow-md w-[50%] sm:w-[60%] md:w-[40%]"
        />
      </div>

      {/* Product Grid Layout */}
      <div className="mt-[50px] w-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto" style={{ maxWidth: '1200px' }}>
          {initialProducts.map((product) => (
            <div 
              key={product.id} 
              className="relative bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ width: '100%', maxWidth: '280px', height: '320px' }}
            >
              <div className="w-full h-[200px] relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-base text-[#e75f06]">P {product.price}</p>
              </div>
              <div className="absolute bottom-2 right-2 bg-[#e75f06] text-white rounded-full p-2 cursor-pointer">
                +
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
