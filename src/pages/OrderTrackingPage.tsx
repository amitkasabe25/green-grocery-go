
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { CheckCircle, XCircle, Search } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  const location = useLocation();
  const { orders } = useStore();
  const [orderId, setOrderId] = useState('');
  const [searchedOrderId, setSearchedOrderId] = useState('');
  const [order, setOrder] = useState<typeof orders[0] | null>(null);
  
  // Check if there's an order ID in the URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderIdParam = params.get('orderId');
    
    if (orderIdParam) {
      setOrderId(orderIdParam);
      handleSearch(orderIdParam);
    }
  }, [location.search]);
  
  const handleSearch = (id: string = orderId) => {
    const foundOrder = orders.find(o => o.id === id);
    setOrder(foundOrder || null);
    setSearchedOrderId(id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-4">
          <Input 
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Button onClick={() => handleSearch()}>
            <Search className="mr-2 h-4 w-4" /> Track
          </Button>
        </div>
      </div>
      
      {searchedOrderId && (
        <div className="max-w-3xl mx-auto">
          {order ? (
            <Card>
              <CardHeader className="border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Order #{order.id}</CardTitle>
                  <OrderStatusBadge status={order.status} className="md:ml-auto" />
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 mb-2">Order Details</h3>
                      <p><span className="font-medium">Date:</span> {formatDate(order.createdAt)}</p>
                      <p><span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 mb-2">Delivery Information</h3>
                      <p><span className="font-medium">Name:</span> {order.customerName}</p>
                      <p><span className="font-medium">Contact:</span> {order.contactNumber}</p>
                      <p><span className="font-medium">Address:</span> {order.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500 mb-2">Order Status</h3>
                    <div className="relative">
                      <div className="flex items-center mb-8">
                        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                          order.status !== 'pending' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {order.status !== 'pending' ? <CheckCircle className="h-5 w-5" /> : <span>1</span>}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold">Order Received</p>
                          <p className="text-sm text-gray-500">Your order has been received and is being processed.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-8">
                        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                          order.status === 'in-progress' || order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {order.status === 'in-progress' || order.status === 'delivered' ? <CheckCircle className="h-5 w-5" /> : <span>2</span>}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold">In Progress</p>
                          <p className="text-sm text-gray-500">Your order is being prepared for delivery.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {order.status === 'delivered' ? <CheckCircle className="h-5 w-5" /> : <span>3</span>}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold">Delivered</p>
                          <p className="text-sm text-gray-500">Your order has been delivered successfully.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500 mb-2">Order Items</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b text-left">
                            <th className="py-2 pr-4">Item</th>
                            <th className="py-2 pr-4">Quantity</th>
                            <th className="py-2 pr-4">Price per Unit</th>
                            <th className="py-2 pr-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.productId} className="border-b">
                              <td className="py-2 pr-4">{item.productName}</td>
                              <td className="py-2 pr-4">{item.quantity}</td>
                              <td className="py-2 pr-4">${item.pricePerUnit.toFixed(2)}</td>
                              <td className="py-2 pr-4">${item.totalPrice.toFixed(2)}</td>
                            </tr>
                          ))}
                          <tr className="font-semibold">
                            <td className="py-2 pr-4" colSpan={3}>Total</td>
                            <td className="py-2 pr-4">${order.totalAmount.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find an order with ID "{searchedOrderId}". Please double-check your order ID and try again.
              </p>
            </div>
          )}
        </div>
      )}
      
      {!searchedOrderId && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm max-w-xl mx-auto">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Track Your Order</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Enter your order ID above to check the status of your order and see delivery details.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
