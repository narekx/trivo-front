import { AppstoreAddOutlined, DashboardOutlined, ProductOutlined } from "@ant-design/icons";

import type { SidebarItemType } from "../model";


export const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    label: "Dashboard",
    type: "item",
    key: "/",
    icon: <DashboardOutlined />,
  },
  {
    label: "Categories",
    type: "item",
    key: "/categories",
    icon: <AppstoreAddOutlined />,
  },
  {
    label: "Products",
    type: "item",
    key: "/products",
    icon: <ProductOutlined />,
  },
];