import { Layout } from 'antd';
import { useAuthUser } from "@entities";
import React, { useState } from 'react';
import { LayoutHeader, Sidebar } from "@widgets";
import type { LayoutComponentType } from "../../../model";

const { Content, Footer } = Layout;

export const AuthLayout: LayoutComponentType = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [collapsed, setCollapsed] = useState(false);
  const authUser = useAuthUser();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onCollapse={(e) => setCollapsed(e)} />

      {/* Main Layout */}
      <Layout>
        {/* LayoutHeader */}
        <LayoutHeader collapsed={collapsed} onCollapse={(e) => setCollapsed(e)} />

        {/* Content */}
        <Content style={{ margin: '16px', padding: '16px', background: '#fff', minHeight: 360 }}>
          {children}
        </Content>

        {/* Footer */}
        {/*<Footer style={{ textAlign: 'center' }}></Footer>*/}
      </Layout>
    </Layout>
  );
};

