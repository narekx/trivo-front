import { useNavigate } from "react-router";
import { Button, Input, Table } from "antd";
import { useQuery} from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { CATEGORIES_LIST_COLUMNS } from "../config";
import React, {useEffect, useMemo, useState} from "react";
import { usePaginateCategoriesApi, CategoryActions } from "@entities";

import type { CategoryInterface} from "@entities";

export const CategoriesListFeature: React.FC = (): React.ReactNode => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const debouncedName = useDebounce(name, 300);

  const navigate = useNavigate();
  const { paginateCategories } = usePaginateCategoriesApi();

  const { data, refetch } = useQuery({
    queryKey: ["CategoriesListPage"],
    queryFn: () => paginateCategories({
      page: page,
      pageSize: pageSize,
      name: debouncedName,
    })
  });

  useEffect((): void => {
    refetch();
  }, [debouncedName, page, pageSize]);

  useEffect(() => {
    setPage(undefined);
  }, [debouncedName]);

  const tableData = useMemo(() => {
    return data?.data.map((category: CategoryInterface) => ({
      ...category,
      key: category.id,
      actions: <CategoryActions id={category.id} />,
    }))

  }, [data?.data])

  function onPaginationChange(newPage: number, newPageSize: number): void {
    setPageSize(newPageSize);
    setPage(newPage);
  }

  return (<>
    <h2>Categories list</h2>
    <Button type="primary" block style={{width: 100, marginBottom: 20}} onClick={() => navigate("/categories/create")}>
      Create
    </Button>
    <Input
      placeholder="Name"
      style={{ marginBottom: 20}}
      value={name}
      onChange={(e) => setName(e.target.value)}
      allowClear={true}
    />
    <Table
      columns={CATEGORIES_LIST_COLUMNS}
      dataSource={tableData}
      pagination={{
        current: data?.meta.current_page,
        pageSize: data?.meta.per_page,
        total: data?.meta.total,
        onChange: onPaginationChange,
        pageSizeOptions: [5, 10, 15],
        showSizeChanger: true,
      }}
    />
  </>);
}