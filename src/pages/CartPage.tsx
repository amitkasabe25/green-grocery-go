
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CartPage: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, placeOrder } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart"
    });
  };
  
  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart"
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !contactNumber || !deliveryAddress) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const order = placeOrder(customerName, contactNumber, deliveryAddress);
    
    if (order) {
      navigate(`/track?orderId=${order.id}`);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            It looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/catalog">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Cart Items</h2>
                <Button variant="ghost" size="sm" onClick={handleClearCart} className="text-red-600 hover:text-red-700">
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.productId} className="p-4 flex items-center">
                  <div className="flex-grow">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">${item.pricePerUnit.toFixed(2)} per unit</p>
                  </div>
                  
                  <div className="flex items-center mr-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
                      className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right mr-4">
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <h2 className="font-semibold text-lg mb-4">Delivery Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name</Label>
                <Input 
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input 
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Input 
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full mt-4">
                Place Order
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
