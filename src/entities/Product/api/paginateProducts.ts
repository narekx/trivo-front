import { useAxios } from "@api";
import type { ProductInterface } from "../model";


interface ProductsPaginateDataInterface {
  category_id?: number | null;
  page?: number | null;
  pageSize?: number | null;
  name?: string | null;
}

interface UseCreateProductApiInterface {
  paginateProducts(data: Readonly<ProductsPaginateDataInterface>): Promise<AppPaginatedResponseInterface<ProductInterface>>;
}

export function usePaginateProductsApi(): UseCreateProductApiInterface {
  const $axios = useAxios("private");
  async function paginateProducts(data: Readonly<ProductsPaginateDataInterface>): Promise<AppPaginatedResponseInterface<ProductInterface>> {
    return await $axios.get<ProductInterface>("/products", {
      params: {
        category_id: data.category_id || undefined,
        name: data.name || undefined,
        page: data.page || undefined,
        per_page: data.pageSize || undefined,
      }
    }) as unknown as AppPaginatedResponseInterface<ProductInterface>;
  }

  return {
    paginateProducts,
  };
}