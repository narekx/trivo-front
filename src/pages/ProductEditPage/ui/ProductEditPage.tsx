import { useParams } from "react-router";
import { ProductEditFeature } from "@features";

import type { FC, ReactNode } from "react";


export const ProductEditPage: FC = (): ReactNode => {
  const { id } = useParams();

  return (<ProductEditFeature id={parseInt(id!)} />);
};

