import type { CategoryInterface } from "@entities";

export interface ProductInterface {
  id: number;
  name: string;
  category: CategoryInterface;
  description: string;
  sku: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormInterface {
  category_id: number | null;
  name: string;
  description: string;
  sku: string;
  price: number;
}