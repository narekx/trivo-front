import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateCategoryApi, CategoryForm } from "@entities";
import { useMutation } from "@tanstack/react-query";
import { useNotifyError, useNotifySuccess} from "@helpers";

import type { CategoryFormInterface, CategoryInterface } from "@entities";


export const CategoryCreateFeature: React.FC = (): React.ReactNode => {
  const [modelValue, setModelValue] = useState<CategoryFormInterface>({
    name: "",
  });

  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();
  const { createCategory } = useCreateCategoryApi();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<CategoryInterface>)  => {
      notifySuccess(success.message);
      navigate("/categories");
    }
  });

  function onModelValueChange(value: Readonly<CategoryFormInterface>): void {
    setModelValue({
      name: value.name,
    });
  }

  function onSubmit(): void {
    mutate({ name: modelValue.name, });
  }

  return (<>
    <h2>Create category</h2>
    <CategoryForm
      value={modelValue}
      onSubmit={onSubmit}
      disabled={isPending}
      btnText="Create category"
      onChange={onModelValueChange}
    />
  </>);
}