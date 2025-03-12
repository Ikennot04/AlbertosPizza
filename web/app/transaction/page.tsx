'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import { Transaction as TransactionType, mockTransactions } from './types';

export default function Transaction() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#f7f0e3]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#e75f06] mb-6">Transaction History</h1>

        {mockTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#e75f06]">No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              {/* Table Head */}
              <thead className="bg-[#e75f06] text-white">
                <tr>
                  <th className="p-4 text-left">Order #</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {mockTransactions.map((tx: TransactionType) => (
                  <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <td className="p-4 text-[#e75f06] font-semibold">#{tx.orderNumber}</td>
                    <td className="p-4 text-[#6b4226]">{tx.date}</td>
                    <td className="p-4">
                      {tx.items.map((item) => (
                        <div key={item.id} className="text-[#6b4226]">
                          {item.quantity}× {item.name} (₱{item.price.toFixed(2)})
                        </div>
                      ))}
                    </td>
                    <td className="p-4 text-lg font-bold text-[#e75f06]">₱{tx.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
