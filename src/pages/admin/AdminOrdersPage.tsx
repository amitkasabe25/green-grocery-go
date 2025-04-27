
import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { Eye, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';

const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  
  const handleStatusChange = (orderId: string, status: 'pending' | 'in-progress' | 'delivered') => {
    updateOrderStatus(orderId, status);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Order ID</th>
                  <th className="text-left py-3 px-2">Customer</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Total</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-right py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-2">{order.id}</td>
                    <td className="py-3 px-2">{order.customerName}</td>
                    <td className="py-3 px-2">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-2">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <Select
                        value={order.status}
                        onValueChange={(value: 'pending' | 'in-progress' | 'delivered') => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <OrderStatusBadge status={order.status} />
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link to={`/track?orderId=${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
