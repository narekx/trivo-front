import { Spin } from "antd";
import { useNavigate } from "react-router";
import React, {useEffect, useState} from "react";
import { useNotifyError, useNotifySuccess} from "@helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFindCategoryApi, useUpdateCategoryApi, CategoryForm } from "@entities";

import type { CategoryFormInterface, CategoryInterface} from "@entities";

interface CategoryEditFeaturesProps {
  id: number;
}

export const CategoryEditFeature: React.FC<CategoryEditFeaturesProps> = (props: CategoryEditFeaturesProps): React.ReactNode => {
  const { id } = props;

  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();
  const { findCategory } = useFindCategoryApi();
  const { updateCategory } = useUpdateCategoryApi();

  const { data, isError, isSuccess, error, isPending: isCategoryFetching } = useQuery({
    queryKey: ["CategoryFind"],
    queryFn: () => findCategory({id}),
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setModelValue({
        name: data?.data?.name,
      });
    } else if (isError) {
      notifyError(error.message);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategory,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<CategoryInterface>): void  => {
      notifySuccess(success.message);
      navigate("/categories");
    }
  });

  const [modelValue, setModelValue] = useState<CategoryFormInterface>({
    name: "",
  });

  function onModelValueChange(value: Readonly<CategoryFormInterface>): void {
    setModelValue({
      name: value.name,
    });
  }

  function onSubmit(): void {
    mutate({ name: modelValue.name, id: id });
  }

  return (<>
    <h2>Edit category</h2>
    {
      isCategoryFetching
        ?
          <div style={{textAlign: 'center', padding: '50px'}}>
            <Spin/>
          </div>
        :
          isError
            ?
              <p>{ error.message }</p>
            :
              <CategoryForm
                value={modelValue}
                onSubmit={onSubmit}
                disabled={isPending}
                btnText="Edit category"
                onChange={onModelValueChange}
              />
    }
  </>);
}