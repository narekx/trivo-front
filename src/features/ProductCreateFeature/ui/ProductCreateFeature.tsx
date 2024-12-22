import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useNotifyError, useNotifySuccess} from "@helpers";
import { ProductForm, ProductFormInterface, ProductInterface, useCreateProductApi} from "@entities";

export const ProductCreateFeature: React.FC = (): React.ReactNode => {
  const [modelValue, setModelValue] = useState<ProductFormInterface>({
    name: "",
    category_id: null,
    price: 0,
    description: "",
    sku: "",
  });

  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();
  const { createProduct } = useCreateProductApi();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<ProductInterface>)  => {
      notifySuccess(success.message);
      navigate("/products");
    }
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
      name: modelValue.name,
      category_id: modelValue.category_id!,
      price: modelValue.price,
      description: modelValue.description,
      sku: modelValue.sku,
    });
  }

  return (<>
    <h2>Create product</h2>
    <ProductForm
      value={modelValue}
      onSubmit={onSubmit}
      disabled={isPending}
      btnText="Create product"
      onChange={onModelValueChange}
    />
  </>);
}