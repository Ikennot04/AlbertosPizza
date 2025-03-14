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
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    date: '2025-03-13',
    items: [
      {
        id: '2',
        name: 'Brown Spanish',
        quantity: 1,
        price: 39,
        subtotal: 39
      },
      {
        id: '3',
        name: 'Oreo Coffee',
        quantity: 1,
        price: 39,
        subtotal: 39
      }
    ],
    total: 78,
    status: 'pending'
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    date: '2025-03-13',
    items: [
      {
        id: '4',
        name: 'Black Forest',
        quantity: 3,
        price: 39,
        subtotal: 117
      }
    ],
    total: 117,
    status: 'cancelled'
  }
];
