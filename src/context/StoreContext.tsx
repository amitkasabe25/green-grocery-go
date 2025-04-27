import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, Order, OrderItem } from '@/types';
import { products as initialProducts } from '@/data/products';
import { orders as initialOrders } from '@/data/orders';
import { useToast } from '@/components/ui/use-toast';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: OrderItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerName: string, contactNumber: string, deliveryAddress: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: 'pending' | 'in-progress' | 'delivered') => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === product.id 
          ? { 
              ...item, 
              quantity: item.quantity + quantity,
              totalPrice: (item.quantity + quantity) * item.pricePerUnit 
            } 
          : item
      ));
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          quantity,
          pricePerUnit: product.pricePerUnit,
          totalPrice: quantity * product.pricePerUnit
        }
      ]);
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.productId === productId 
        ? { 
            ...item, 
            quantity,
            totalPrice: quantity * item.pricePerUnit 
          } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (customerName: string, contactNumber: string, deliveryAddress: string): Order | undefined => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive"
      });
      return undefined;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      items: [...cart],
      customerName,
      contactNumber,
      deliveryAddress,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setOrders([...orders, newOrder]);
    clearCart();
    
    toast({
      title: "Order placed successfully",
      description: `Your order ID is ${newOrder.id}`
    });
    
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: 'pending' | 'in-progress' | 'delivered') => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status } 
        : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} is now ${status}`
    });
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: String(products.length + 1)
    };
    
    setProducts([...products, newProduct]);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to the catalog`
    });
  };

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => 
      p.id === product.id ? product : p
    ));
    
    toast({
      title: "Product updated",
      description: `${product.name} has been updated`
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    
    toast({
      title: "Product deleted",
      description: "The product has been removed from the catalog"
    });
  };
  
  return (
    <StoreContext.Provider value={{
      products,
      orders,
      cart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
