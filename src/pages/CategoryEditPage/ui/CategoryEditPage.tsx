import { useAxios } from "@api";
import { useEffect } from "react";

import type { FC, ReactNode } from "react";
import { useParams } from "react-router";
import {CategoryEditFeature} from "@features";


export const CategoryEditPage: FC = (): ReactNode => {
  const { id } = useParams();

  return (<CategoryEditFeature id={parseInt(id!)} />);
};

