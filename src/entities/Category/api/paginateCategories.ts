import { useAxios } from "@api";
import type { CategoryInterface } from "../model";


interface CategoriesPaginateDataInterface {
  name?: string | null;
  page?: number | null;
  pageSize?: number | null;
}

interface UsePaginateCategoriesApiInterface {
  paginateCategories(data: Readonly<CategoriesPaginateDataInterface>): Promise<AppPaginatedResponseInterface<CategoryInterface>>;
}

export function usePaginateCategoriesApi(): UsePaginateCategoriesApiInterface {
  const $axios = useAxios("private");
  async function paginateCategories(data: Readonly<CategoriesPaginateDataInterface>): Promise<AppPaginatedResponseInterface<CategoryInterface>> {
    return await $axios.get<CategoryInterface>("/categories", {
      params: {
        name: data.name || undefined,
        page: data.page || undefined,
        per_page: data.pageSize || undefined,
      }
    }) as unknown as AppPaginatedResponseInterface<CategoryInterface>;
  }

  return {
    paginateCategories,
  };
}