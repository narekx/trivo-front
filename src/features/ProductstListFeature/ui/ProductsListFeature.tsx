import { useNavigate } from "react-router";
import {Button, Flex, Input, Table} from "antd";
import { useQuery} from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { PRODUCTS_LIST_COLUMNS } from "../config";
import React, {useEffect, useMemo, useState} from "react";
import {CategorySelect, ProductActions, usePaginateProductsApi} from "@entities";

import type { ProductInterface} from "@entities";

export const ProductsListFeature: React.FC = (): React.ReactNode => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const debouncedName = useDebounce(name, 300);

  const navigate = useNavigate();
  const { paginateProducts } = usePaginateProductsApi();

  const { data, refetch } = useQuery({
    queryKey: ["ProductsListPage"],
    queryFn: () => paginateProducts({
      page: page,
      pageSize: pageSize,
      category_id: categoryId,
      name: debouncedName,
    })
  });

  useEffect((): void => {
    refetch();
  }, [debouncedName, page, pageSize, categoryId]);

  useEffect(() => {
    setPage(undefined);
  }, [debouncedName]);

  const tableData = useMemo(() => {
    return data?.data.map((product: ProductInterface) => ({
      ...product,
      key: product.id,
      actions: <ProductActions id={product.id} />,
    }))

  }, [data?.data])

  function onPaginationChange(newPage: number, newPageSize: number): void {
    setPageSize(newPageSize);
    setPage(newPage);
  }

  return (<>
    <h2>Products list</h2>
    <Button type="primary" block style={{width: 100, marginBottom: 20}} onClick={() => navigate("/products/create")}>
      Create
    </Button>
    <Flex gap={20}>
      <Input
        placeholder="Name"
        style={{ marginBottom: 20}}
        value={name}
        onChange={(e) => setName(e.target.value)}
        allowClear={true}
      />
      <CategorySelect
        placeholder="Filter by category"
        value={categoryId}
        onChange={(e) => setCategoryId(e)}
        allowClear={true}
      />
    </Flex>
    <Table
      columns={PRODUCTS_LIST_COLUMNS}
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