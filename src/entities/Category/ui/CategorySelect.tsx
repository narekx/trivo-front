import {Select} from "antd";
import React, {useMemo} from "react";
import { useGetAllCategoriesApi } from "../api";
import { useQuery } from "@tanstack/react-query";
import type {CategoryInterface} from "../model";

interface CategorySelectPropsInterface {
  placeholder: string;
  value: number | null | undefined;
  onChange: (value: number) => void;
  allowClear?: boolean;
}

export const CategorySelect: React.FC<CategorySelectPropsInterface> = (props: CategorySelectPropsInterface): React.ReactNode => {
  const { placeholder, value, onChange, allowClear = false } = props;

  const { getAllCategories } = useGetAllCategoriesApi();

  const { data, isPending } = useQuery({
    queryKey: ["GetAllCategories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const options = useMemo(() => {
    return data?.data?.map((category: Pick<CategoryInterface, "id" | "name">) => ({label: category.name, value: category.id}));
  }, [data])

  return (
    <Select
      value={value}
      options={options}
      loading={isPending}
      onChange={onChange}
      allowClear={allowClear}
      style={{ width: "100%" }}
      placeholder={placeholder}
    />
  );
}