
import React from 'react';
import { OrderStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return '';
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };
  
  return (
    <Badge variant="outline" className={cn(getStatusColor(status), className)}>
      {getStatusText(status)}
    </Badge>
  );
};

export default OrderStatusBadge;
