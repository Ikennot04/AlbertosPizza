'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiCloseLine } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Iced Caramel', price: 39, quantity: 1 }
  ]);
  
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white">
        <div className="p-4 bg-[#e75f06] text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#d45605] rounded-full transition-colors"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => {
                  onClose();
                  router.push('/menu');
                }}
                className="mt-4 px-6 py-2 bg-[#e75f06] text-white rounded-lg hover:bg-[#d45605] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-[#4b3025]">{item.name}</h3>
                    <p className="text-[#e75f06] font-semibold">₱{item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setItems(prev => 
                          prev.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)
                        )}
                        className="w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => setItems(prev => 
                          prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
                        )}
                        className="w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#4b3025] font-medium">Total</span>
              <span className="text-xl font-bold text-[#e75f06]">₱{total}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                router.push('/checkout');
              }}
              className="w-full py-3 bg-[#e75f06] text-white rounded-lg hover:bg-[#d45605] transition-colors font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}