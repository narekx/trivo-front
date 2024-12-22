import { useAxios } from "@api";
import type { CategoryInterface } from "../model";


interface CategoryFindDataInterface {
  id: number;
}

interface UseFindCategoryApiInterface {
  findCategory(data: Readonly<CategoryFindDataInterface>): Promise<AppResponseInterface<CategoryInterface>>;
}

export function useFindCategoryApi(): UseFindCategoryApiInterface {
  const $axios = useAxios("private");
  async function findCategory(data: Readonly<CategoryFindDataInterface>): Promise<AppResponseInterface<CategoryInterface>> {
    return await $axios.get<CategoryInterface>(`/categories/${data.id}`);
  }

  return {
    findCategory,
  };
}
