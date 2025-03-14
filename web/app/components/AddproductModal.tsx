"use client";

import { useState } from "react";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddProduct({ open, onClose }: AddProductProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Product Data:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6" onClick={handleModalContentClick}>
          <div className="text-2xl font-bold text-gray-800 mb-4">Add New Product</div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-700 font-medium">Product Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 focus:border-[#405e01] focus:ring-[#405e01]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-gray-700 font-medium">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 focus:border-[#405e01] focus:ring-[#405e01]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-gray-700 font-medium">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 focus:border-[#405e01] focus:ring-[#405e01]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="text-gray-700 font-medium">Stock Quantity</label>
              <input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 focus:border-[#405e01] focus:ring-[#405e01]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-gray-700 font-medium">Image URL</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 focus:border-[#405e01] focus:ring-[#405e01]"
                required
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#405e01] text-white hover:bg-[#405e01]/90"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
