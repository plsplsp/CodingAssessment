export interface Variant {
  color: string;
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  variants: Variant[];
}