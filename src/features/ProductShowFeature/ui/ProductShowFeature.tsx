import { Spin } from "antd";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {useFindProductApi, Product} from "@entities";


interface ProductEditFeaturesProps {
  id: number;
}

export const ProductShowFeature: React.FC<ProductEditFeaturesProps> = (props: ProductEditFeaturesProps): React.ReactNode => {
  const { id } = props;

  const { findProduct } = useFindProductApi();

  const { data, isError, error, isPending: isProductFetching } = useQuery({
    queryKey: ["ProductShow"],
    queryFn: () => findProduct({id}),
    refetchOnReconnect: true,
    retry: true,
  });

  return (<>
    <h2>Show product</h2>
    {
      isProductFetching
        ?
          <div style={{textAlign: 'center', padding: '50px'}}>
            <Spin/>
          </div>
        :
          isError
            ?
              <p>{ error.message }</p>
            :
              <Product product={data?.data} />
    }
  </>);
}