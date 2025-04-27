
import React, { useState } from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();
  
  const increaseQuantity = () => {
    setQuantity(q => q + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-primary font-medium mt-1">
          ${product.pricePerUnit.toFixed(2)} / {product.unit}
        </p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-3">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-r-none"
              onClick={decreaseQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="h-8 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-l-none"
              onClick={increaseQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
