import { useParams } from "react-router";
import { CategoryShowFeature} from "@features";

import type { FC, ReactNode } from "react";


export const CategoryShowPage: FC = (): ReactNode => {
  const { id } = useParams();

  return (<CategoryShowFeature id={parseInt(id!)} />);
};

