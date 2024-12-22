import { useAxios } from "@api";
import type { ProductInterface } from "../model";


interface ProductFindDataInterface {
  id: number;
  name: string;
  sku: string;
  price: number;
  category_id: number;
  description: string;
}

interface UseUpdateProductApiInterface {
  updateProduct(data: Readonly<ProductFindDataInterface>): Promise<AppResponseInterface<ProductInterface>>;
}

export function useUpdateProductApi(): UseUpdateProductApiInterface {
  const $axios = useAxios("private");
  async function updateProduct(data: Readonly<ProductFindDataInterface>): Promise<AppResponseInterface<ProductInterface>> {
    return await $axios.put<ProductInterface>(`/products/${data.id}`, {
      name: data.name,
      category_id: data.category_id,
      price: data.price,
      description: data.description,
      sku: data.sku,
    });
  }

  return {
    updateProduct,
  };
}
