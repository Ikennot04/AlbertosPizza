"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, initialProducts } from './product';
import Navbar from '../components/navbar';

export default function CoffeeList() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const handleBackClick = () => {
        router.push('/homepage');
    };

    return (
        <div className="min-h-screen bg-[#f7f0e3] font-sans">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={handleBackClick}
                    className="px-4 py-2 bg-[#4b3025] text-white rounded-lg font-bold text-base hover:bg-[#3a251d] transition-colors duration-200"
                >
                    ← Back
                </button>
                
                <h1 className="text-4xl font-bold text-[#6b4226] text-center my-8">Coffee Menu</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
                        >
                            <div className="w-full flex justify-center items-center p-4 bg-[#fff8e7] border-b border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-3/5 h-auto rounded-lg object-cover"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-2xl font-bold text-[#4b3025] mb-3">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <p className="text-xl font-bold text-[#6b4226] mb-2">Price: ₱{product.price}</p>
                                <p className="text-[#4b4225]">Stock: {product.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
