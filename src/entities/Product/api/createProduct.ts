import { useAxios } from "@api";
import type { ProductInterface } from "../model";


interface ProductCreateDataInterface {
  name: string;
  sku: string;
  price: number;
  category_id: number;
  description: string;
}

interface UseCreateProductApiInterface {
  createProduct(data: Readonly<ProductCreateDataInterface>): Promise<AppResponseInterface<ProductInterface>>;
}

export function useCreateProductApi(): UseCreateProductApiInterface {
  const $axios = useAxios("private");
  async function createProduct(data: Readonly<ProductCreateDataInterface>): Promise<AppResponseInterface<ProductInterface>> {
    return await $axios.post<ProductInterface>("/products", {
      name: data.name,
      category_id: data.category_id,
      price: data.price,
      description: data.description,
      sku: data.sku,
    });
  }

  return {
    createProduct,
  };
}