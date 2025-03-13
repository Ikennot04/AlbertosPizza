'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import { Transaction as TransactionType, mockTransactions } from './types';

type StatusType = 'ongoing' | 'completed' | 'cancelled' | 'all';

export default function Transaction() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<StatusType>('all');

  const filteredTransactions = mockTransactions.filter(tx => {
    if (activeStatus === 'all') return true;
    if (activeStatus === 'ongoing') return tx.status === 'pending';
    return tx.status === activeStatus;
  });

  const getStatusCount = (status: StatusType) => {
    if (status === 'all') return mockTransactions.length;
    if (status === 'ongoing') return mockTransactions.filter(tx => tx.status === 'pending').length;
    return mockTransactions.filter(tx => tx.status === status).length;
  };

  const handleStatusChange = (transactionId: string, newStatus: 'completed' | 'cancelled') => {
    // Here you would typically make an API call to update the status
    console.log(`Updating transaction ${transactionId} to ${newStatus}`);
  };

  const handleReorder = (transaction: TransactionType) => {
    // Here you would typically handle the reorder logic
    console.log('Reordering items:', transaction.items);
  };
  
  return (
    <div className="min-h-screen bg-[#f7f0e3]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#e75f06] mb-4 sm:mb-6">Transaction History</h1>

        {/* Status Navigation Bar */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
          {(['all', 'ongoing', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                activeStatus === status
                  ? 'bg-[#e75f06] text-white'
                  : 'bg-white text-[#e75f06] hover:bg-[#fde8d7]'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({getStatusCount(status)})
            </button>
          ))}
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-lg sm:text-xl text-[#e75f06]">No {activeStatus !== 'all' ? activeStatus : ''} transactions found.</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Card Layout */}
            <div className="sm:hidden space-y-4">
              {filteredTransactions.map((tx: TransactionType) => (
                <div key={tx.id} className="bg-white rounded-lg shadow-md p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[#e75f06] font-semibold">#{tx.orderNumber}</span>
                      <div className="text-sm text-[#6b4226] mt-1">{tx.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {tx.items.map((item) => (
                      <div key={item.id} className="text-sm text-[#6b4226]">
                        {item.quantity}× {item.name} (₱{item.price.toFixed(2)})
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-base font-bold text-[#e75f06]">
                    Total: ₱{tx.total.toFixed(2)}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {tx.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(tx.id, 'completed')}
                          className="flex-1 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(tx.id, 'cancelled')}
                          className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {tx.status === 'cancelled' && (
                      <button
                        onClick={() => handleReorder(tx)}
                        className="w-full px-3 py-1.5 bg-[#e75f06] text-white rounded-md hover:bg-[#d55605] transition-colors text-sm"
                      >
                        Re-order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden sm:block overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="w-full border-collapse">
                <thead className="bg-[#e75f06] text-white">
                  <tr>
                    <th className="p-4 text-left text-sm lg:text-base">Order #</th>
                    <th className="p-4 text-left text-sm lg:text-base">Date</th>
                    <th className="p-4 text-left text-sm lg:text-base">Items</th>
                    <th className="p-4 text-left text-sm lg:text-base">Total</th>
                    <th className="p-4 text-left text-sm lg:text-base">Status</th>
                    <th className="p-4 text-left text-sm lg:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx: TransactionType) => (
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
                      <td className="p-4">
                        <div className="flex gap-2">
                          {tx.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(tx.id, 'completed')}
                                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleStatusChange(tx.id, 'cancelled')}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {tx.status === 'cancelled' && (
                            <button
                              onClick={() => handleReorder(tx)}
                              className="px-3 py-1 bg-[#e75f06] text-white rounded-md hover:bg-[#d55605] transition-colors text-sm"
                            >
                              Re-order
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
