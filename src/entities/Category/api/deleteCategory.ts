import { useAxios } from "@api";

interface CategoryDeleteDataInterface {
  id: number;
}

interface UseCreateCategoryApiInterface {
  deleteCategory(data: Readonly<CategoryDeleteDataInterface>): Promise<AppResponseInterface<[]>>;
}

export function useDeleteCategoryApi(): UseCreateCategoryApiInterface {
  const $axios = useAxios("private");
  async function deleteCategory(data: Readonly<CategoryDeleteDataInterface>): Promise<AppResponseInterface<[]>> {
    return await $axios.delete<[]>(`/categories/${data.id}`);
  }

  return {
    deleteCategory,
  };
}