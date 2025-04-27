
export interface Product {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: string;
  description: string;
  imageUrl: string;
  category: 'vegetables' | 'fruits';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  contactNumber: string;
  deliveryAddress: string;
  totalAmount: number;
  status: 'pending' | 'in-progress' | 'delivered';
  createdAt: string;
}

export type OrderStatus = 'pending' | 'in-progress' | 'delivered';
