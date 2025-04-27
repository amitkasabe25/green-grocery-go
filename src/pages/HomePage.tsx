
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

const HomePage: React.FC = () => {
  const { products } = useStore();
  
  // Get 4 featured products (2 fruits and 2 vegetables)
  const featuredProducts = [
    ...products.filter(p => p.category === 'vegetables').slice(0, 2),
    ...products.filter(p => p.category === 'fruits').slice(0, 2)
  ];
  
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Fresh Produce for Your Business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Quality vegetables and fruits delivered in bulk at competitive prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/catalog">Browse Products</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/track">Track Your Order</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399" 
                  alt="Fresh produce" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">Bulk Orders</p>
                  <p className="text-sm">No minimum order quantities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured products section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/catalog" className="text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Browse & Select</h3>
              <p className="text-gray-600">
                Browse our catalog and select the fresh produce you need for your business.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Place Your Order</h3>
              <p className="text-gray-600">
                Specify quantities and provide your delivery details to place your bulk order.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Receive & Enjoy</h3>
              <p className="text-gray-600">
                Track your order and receive fresh produce delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Stock Up?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Place your bulk order now and get fresh produce delivered to your business.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/catalog">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
