export interface Transaction {
  id: string;
  orderNumber: string;
  date: string;
  items: TransactionItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface TransactionItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    date: '2025-03-12',
    items: [
      {
        id: '1',
        name: 'Iced Caramel',
        quantity: 2,
        price: 39,
        subtotal: 78
      }
    ],
    total: 78,
    status: 'completed'
  }
];
