export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
