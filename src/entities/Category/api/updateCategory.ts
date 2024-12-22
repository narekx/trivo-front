import { useAxios } from "@api";
import type { CategoryInterface } from "../model";


interface CategoryFindDataInterface {
  id: number;
  name: string;
}

interface UseUpdateCategoryApiInterface {
  updateCategory(data: Readonly<CategoryFindDataInterface>): Promise<AppResponseInterface<CategoryInterface>>;
}

export function useUpdateCategoryApi(): UseUpdateCategoryApiInterface {
  const $axios = useAxios("private");
  async function updateCategory(data: Readonly<CategoryFindDataInterface>): Promise<AppResponseInterface<CategoryInterface>> {
    return await $axios.put<CategoryInterface>(`/categories/${data.id}`, {
      name: data.name,
    });
  }

  return {
    updateCategory,
  };
}
