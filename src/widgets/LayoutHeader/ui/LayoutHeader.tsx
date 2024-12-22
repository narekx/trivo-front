import React from "react";
import {Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {LogoutFeature} from "@features";

const { Header } = Layout;

interface HeaderComponentProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const LayoutHeader: React.FC<HeaderComponentProps> = (props: HeaderComponentProps): React.ReactNode => {
  const { collapsed, onCollapse } = props;


  return (
    <Header
      style={{
        padding: '0 16px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={() => onCollapse(!collapsed)} style={{ fontSize: 18, cursor: 'pointer' }} />
      ) : (
        <MenuFoldOutlined onClick={() => onCollapse(!collapsed)} style={{ fontSize: 18, cursor: 'pointer' }} />
      )}
      <LogoutFeature />
    </Header>
  );
}