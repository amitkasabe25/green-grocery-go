
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home, Package, FileText } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { cart } = useStore();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">GreenGrocery</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-600 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/track" className="text-gray-600 hover:text-primary transition-colors">
              Track Order
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
                Admin Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
                <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">GreenGrocery</h3>
              <p className="text-gray-600">Your trusted source for fresh produce in bulk quantities.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-gray-600 hover:text-primary transition-colors">Products</Link>
                </li>
                <li>
                  <Link to="/track" className="text-gray-600 hover:text-primary transition-colors">Track Order</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <address className="not-italic text-gray-600">
                <p>123 Produce Lane</p>
                <p>Farmington, CA 90210</p>
                <p className="mt-2">Phone: (555) 123-4567</p>
                <p>Email: info@greengrocery.com</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} GreenGrocery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
