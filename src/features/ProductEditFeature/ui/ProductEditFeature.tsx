import { Spin } from "antd";
import { useNavigate } from "react-router";
import React, {useEffect, useState} from "react";
import { useNotifyError, useNotifySuccess} from "@helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFindProductApi, useUpdateProductApi, ProductForm } from "@entities";

import type { ProductFormInterface, ProductInterface} from "@entities";

interface ProductEditFeaturesProps {
  id: number;
}

export const ProductEditFeature: React.FC<ProductEditFeaturesProps> = (props: ProductEditFeaturesProps): React.ReactNode => {
  const { id } = props;

  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();
  const { findProduct } = useFindProductApi();
  const { updateProduct } = useUpdateProductApi();

  const { data, isError, isSuccess, error, isPending: isProductFetching } = useQuery({
    queryKey: ["ProductFind"],
    queryFn: () => findProduct({id}),
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setModelValue({
        name: data?.data.name,
        category_id: data?.data.category.id,
        price: data?.data.price,
        description: data?.data.description,
        sku: data?.data.sku,
      });
    } else if (isError) {
      notifyError(error.message);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<ProductInterface>): void  => {
      notifySuccess(success.message);
      navigate("/products");
    }
  });

  const [modelValue, setModelValue] = useState<ProductFormInterface>({
    name: "",
    category_id: null,
    price: 0,
    description: "",
    sku: "",
  });

  function onModelValueChange(value: Readonly<ProductFormInterface>): void {
    setModelValue({
      name: value.name,
      category_id: value.category_id,
      price: value.price,
      description: value.description,
      sku: value.sku,
    });
  }

  function onSubmit(): void {
    mutate({
      id: id,
      name: modelValue.name,
      category_id: modelValue.category_id!,
      price: modelValue.price,
      description: modelValue.description,
      sku: modelValue.sku,
    });
  }

  return (<>
    <h2>Edit Product</h2>
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
              <ProductForm
                value={modelValue}
                onSubmit={onSubmit}
                disabled={isPending}
                btnText="Edit Product"
                onChange={onModelValueChange}
              />
    }
  </>);
}