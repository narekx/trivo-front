import { useAxios } from "@api";
import type { ProductInterface} from "../model";


interface ProductFindDataInterface {
  id: number;
}

interface UseFindProductApiInterface {
  findProduct(data: Readonly<ProductFindDataInterface>): Promise<AppResponseInterface<ProductInterface>>;
}

export function useFindProductApi(): UseFindProductApiInterface {
  const $axios = useAxios("private");
  async function findProduct(data: Readonly<ProductFindDataInterface>): Promise<AppResponseInterface<ProductInterface>> {
    return await $axios.get<ProductInterface>(`/products/${data.id}`);
  }

  return {
    findProduct,
  };
}
