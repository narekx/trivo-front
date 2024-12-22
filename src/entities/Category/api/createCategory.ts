import { useAxios } from "@api";
import type { CategoryInterface } from "../model";


interface CategoryCreateDataInterface {
  name: string;
}

interface UseCreateCategoryApiInterface {
  createCategory(data: Readonly<CategoryCreateDataInterface>): Promise<AppResponseInterface<CategoryInterface>>;
}

export function useCreateCategoryApi(): UseCreateCategoryApiInterface {
  const $axios = useAxios("private");
  async function createCategory(data: Readonly<CategoryCreateDataInterface>): Promise<AppResponseInterface<CategoryInterface>> {
    return await $axios.post<CategoryInterface>("/categories", {
      name: data.name,
    });
  }

  return {
    createCategory,
  };
}