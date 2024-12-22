import { Menu } from "antd";
import React, {useMemo} from "react";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router";
import { SIDEBAR_ITEMS } from "../config/sidebarItems.tsx";
import type {SidebarItemType} from "../model";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps): React.ReactNode => {
  const { collapsed, onCollapse } = props;
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;
  const selectedItems = useMemo<string[]>(() => {
    return SIDEBAR_ITEMS
      .filter((item: SidebarItemType): boolean => currentRoute.startsWith(item!.key as string))
      .slice(-1)
      .map<string>((item: SidebarItemType): string => item!.key as string);
  }, [currentRoute]);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
      <div style={{ height: 64, color: '#fff', textAlign: 'center', lineHeight: '64px', fontWeight: 'bold' }}>
        TRIVO
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={SIDEBAR_ITEMS}
        onClick={(e) => navigate(e.key)}
        selectedKeys={selectedItems}
      />
    </Sider>
  );
}