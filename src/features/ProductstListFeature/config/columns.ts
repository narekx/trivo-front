import type {ColumnsType} from "antd/es/table";

export const PRODUCTS_LIST_COLUMNS: ColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
];