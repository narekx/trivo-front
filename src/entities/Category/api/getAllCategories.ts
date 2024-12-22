import { useAxios } from "@api";
import type { CategoryInterface } from "../model";

interface UseFindCategoryApiInterface {
  getAllCategories(): Promise<AppResponseInterface<Pick<CategoryInterface, "id" | "name">[]>>;
}

export function useGetAllCategoriesApi(): UseFindCategoryApiInterface {
  const $axios = useAxios("private");
  async function getAllCategories(): Promise<AppResponseInterface<Pick<CategoryInterface, "id" | "name">[]>> {
    return await $axios.get<Pick<CategoryInterface, "id" | "name">[]>(`/categories/all`);
  }

  return {
    getAllCategories,
  };
}
