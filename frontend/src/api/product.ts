import { Product } from "../types";

const mockProduct: Product = {
  id: "p001",
  name: "Premium Casual Shoes",
  image: "https://picsum.photos/500/500",
  description: "Comfortable, breathable, stylish daily sneakers.",
  variants: [
    { color: "Black", size: "39", price: 129, stock: 10 },
    { color: "Black", size: "40", price: 129, stock: 5 },
    { color: "White", size: "39", price: 119, stock: 0 },
    { color: "White", size: "40", price: 119, stock: 12 },
  ],
};

export async function fetchProduct(): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockProduct;
}