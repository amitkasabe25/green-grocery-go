
import { Order } from '@/types';

export const orders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      {
        productId: '1',
        productName: 'Tomatoes',
        quantity: 10,
        pricePerUnit: 2.99,
        totalPrice: 29.90
      },
      {
        productId: '3',
        productName: 'Onions',
        quantity: 5,
        pricePerUnit: 1.29,
        totalPrice: 6.45
      }
    ],
    customerName: 'John Smith',
    contactNumber: '555-123-4567',
    deliveryAddress: '123 Main St, Anytown, USA',
    totalAmount: 36.35,
    status: 'pending',
    createdAt: '2025-04-26T09:30:00'
  },
  {
    id: 'ORD-002',
    items: [
      {
        productId: '5',
        productName: 'Apples',
        quantity: 15,
        pricePerUnit: 3.49,
        totalPrice: 52.35
      },
      {
        productId: '6',
        productName: 'Bananas',
        quantity: 8,
        pricePerUnit: 1.99,
        totalPrice: 15.92
      }
    ],
    customerName: 'Jane Doe',
    contactNumber: '555-987-6543',
    deliveryAddress: '456 Oak Ave, Sometown, USA',
    totalAmount: 68.27,
    status: 'in-progress',
    createdAt: '2025-04-25T14:45:00'
  },
  {
    id: 'ORD-003',
    items: [
      {
        productId: '2',
        productName: 'Potatoes',
        quantity: 20,
        pricePerUnit: 1.49,
        totalPrice: 29.80
      },
      {
        productId: '4',
        productName: 'Carrots',
        quantity: 7,
        pricePerUnit: 1.79,
        totalPrice: 12.53
      }
    ],
    customerName: 'Bob Johnson',
    contactNumber: '555-456-7890',
    deliveryAddress: '789 Pine Rd, Othertown, USA',
    totalAmount: 42.33,
    status: 'delivered',
    createdAt: '2025-04-24T11:15:00'
  }
];
