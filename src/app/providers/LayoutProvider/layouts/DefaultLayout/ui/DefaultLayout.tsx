import React, { ReactNode } from "react";
import { LayoutComponentType } from "../../../model";
import { Card } from "antd";

export const DefaultLayout: LayoutComponentType = ({ children }: {children: ReactNode}) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5"
    }}>
      <Card style={{ width: 300, textAlign: "center" }}>
        {children}
      </Card>
    </div>
  );
};