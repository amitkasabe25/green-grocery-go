
import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingBag } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage orders and products</p>
        </div>
      </div>
      
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders" asChild>
            <Link to="/admin/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </TabsTrigger>
          <TabsTrigger value="products" asChild>
            <Link to="/admin/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Link>
          </TabsTrigger>
        </TabsList>
        
        <Outlet />
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
