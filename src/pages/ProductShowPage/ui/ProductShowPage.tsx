import { useParams } from "react-router";
import {ProductShowFeature} from "@features";

import type { FC, ReactNode } from "react";


export const ProductShowPage: FC = (): ReactNode => {
  const { id } = useParams();

  return (<ProductShowFeature id={parseInt(id!)} />);
};

