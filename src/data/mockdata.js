export const mockOrders = [
  {
    id: 12345,
    table: 'Table 1',
    status: 'active',
    orderStatus: 'process', // process, ready, completed
    category: 'pastry',
    items: [
      { id: 1, name: 'Croissant', quantity: 2, price: 25000 },
      { id: 2, name: 'Pain au Chocolat', quantity: 1, price: 30000 }
    ],
    totalPrice: 80000,
    createdAt: new Date('2025-10-29T08:30:00')
  },
  {
    id: 67890,
    table: 'Table 2',
    status: 'active',
    orderStatus: 'ready',
    category: 'makanan-berat',
    items: [
      { id: 3, name: 'Beef Burger', quantity: 1, price: 55000 },
      { id: 4, name: 'French Fries', quantity: 2, price: 25000 }
    ],
    totalPrice: 105000,
    createdAt: new Date('2025-10-29T09:00:00')
  },
  {
    id: 11223,
    table: 'Table 3',
    status: 'active',
    orderStatus: 'process',
    category: 'minuman',
    items: [
      { id: 5, name: 'Cappuccino', quantity: 2, price: 35000 },
      { id: 6, name: 'Latte', quantity: 1, price: 38000 }
    ],
    totalPrice: 108000,
    createdAt: new Date('2025-10-29T09:15:00')
  },
  {
    id: 44556,
    table: 'Table 4',
    status: 'active',
    orderStatus: 'completed',
    category: 'pastry',
    items: [
      { id: 7, name: 'Cheese Cake', quantity: 1, price: 45000 }
    ],
    totalPrice: 45000,
    createdAt: new Date('2025-10-29T08:00:00')
  },
  {
    id: 77889,
    table: 'Table 5',
    status: 'active',
    orderStatus: 'ready',
    category: 'minuman',
    items: [
      { id: 8, name: 'Espresso', quantity: 3, price: 28000 },
      { id: 9, name: 'Green Tea', quantity: 1, price: 25000 }
    ],
    totalPrice: 109000,
    createdAt: new Date('2025-10-29T09:30:00')
  },
  {
    id: 99001,
    table: 'Table 6',
    status: 'active',
    orderStatus: 'process',
    category: 'makanan-berat',
    items: [
      { id: 10, name: 'Pasta Carbonara', quantity: 1, price: 65000 },
      { id: 11, name: 'Caesar Salad', quantity: 1, price: 45000 }
    ],
    totalPrice: 110000,
    createdAt: new Date('2025-10-29T10:00:00')
  }
];

export const historyOrders = [
  {
    id: 10001,
    table: 'Table 7',
    status: 'history',
    orderStatus: 'completed',
    category: 'pastry',
    items: [
      { id: 12, name: 'Croissant', quantity: 3, price: 25000 }
    ],
    totalPrice: 75000,
    createdAt: new Date('2025-10-28T14:30:00'),
    completedAt: new Date('2025-10-28T15:00:00')
  },
  {
    id: 10002,
    table: 'Table 2',
    status: 'history',
    orderStatus: 'completed',
    category: 'minuman',
    items: [
      { id: 13, name: 'Iced Coffee', quantity: 2, price: 32000 }
    ],
    totalPrice: 64000,
    createdAt: new Date('2025-10-28T13:00:00'),
    completedAt: new Date('2025-10-28T13:30:00')
  }
];