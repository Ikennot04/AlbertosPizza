"use client"

import { useState } from 'react';
import { Product } from '../product/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="relative bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
        style={{ width: '100%', maxWidth: '280px', height: '320px' }}
        onClick={() => setIsModalOpen(true)}
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
        <div className="absolute bottom-2 right-2 bg-[#e75f06] text-white rounded-full p-2">
          +
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-[90%] relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-xl text-[#e75f06] font-semibold mb-4">P {product.price}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
                
                <button 
                  className="w-full bg-[#e75f06] text-white py-2 px-4 rounded-lg hover:bg-[#d55605] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart functionality can be added here
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}