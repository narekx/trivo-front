import { useAxios } from "@api";

interface ProductDeleteDataInterface {
  id: number;
}

interface UseCreateProductApiInterface {
  deleteProduct(data: Readonly<ProductDeleteDataInterface>): Promise<AppResponseInterface<[]>>;
}

export function useDeleteProductApi(): UseCreateProductApiInterface {
  const $axios = useAxios("private");
  async function deleteProduct(data: Readonly<ProductDeleteDataInterface>): Promise<AppResponseInterface<[]>> {
    return await $axios.delete<[]>(`/products/${data.id}`);
  }

  return {
    deleteProduct,
  };
}