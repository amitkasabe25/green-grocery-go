
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tomatoes',
    pricePerUnit: 2.99,
    unit: 'kg',
    description: 'Fresh, ripe tomatoes perfect for salads and cooking.',
    imageUrl: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469',
    category: 'vegetables'
  },
  {
    id: '2',
    name: 'Potatoes',
    pricePerUnit: 1.49,
    unit: 'kg',
    description: 'Premium quality potatoes, great for roasting and mashing.',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    category: 'vegetables'
  },
  {
    id: '3',
    name: 'Onions',
    pricePerUnit: 1.29,
    unit: 'kg',
    description: 'Yellow onions, essential for any kitchen.',
    imageUrl: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31',
    category: 'vegetables'
  },
  {
    id: '4',
    name: 'Carrots',
    pricePerUnit: 1.79,
    unit: 'kg',
    description: 'Fresh and crunchy carrots, rich in vitamins.',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    category: 'vegetables'
  },
  {
    id: '5',
    name: 'Apples',
    pricePerUnit: 3.49,
    unit: 'kg',
    description: 'Crisp and sweet apples, perfect for snacking.',
    imageUrl: 'https://images.unsplash.com/photo-1567306226408-28c8bd5a5c79',
    category: 'fruits'
  },
  {
    id: '6',
    name: 'Bananas',
    pricePerUnit: 1.99,
    unit: 'kg',
    description: 'Ripe bananas, naturally sweet and nutritious.',
    imageUrl: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
    category: 'fruits'
  },
  {
    id: '7',
    name: 'Oranges',
    pricePerUnit: 2.49,
    unit: 'kg',
    description: 'Juicy oranges, packed with vitamin C.',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9041525',
    category: 'fruits'
  },
  {
    id: '8',
    name: 'Cucumbers',
    pricePerUnit: 1.89,
    unit: 'kg',
    description: 'Fresh cucumbers, perfect for salads.',
    imageUrl: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e',
    category: 'vegetables'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
