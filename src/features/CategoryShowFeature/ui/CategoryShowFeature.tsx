import React from "react";
import { Spin } from "antd";
import {  useQuery } from "@tanstack/react-query";
import {useFindCategoryApi, Category} from "@entities";

interface CategoryEditFeaturesProps {
  id: number;
}

export const CategoryShowFeature: React.FC<CategoryEditFeaturesProps> = (props: CategoryEditFeaturesProps): React.ReactNode => {
  const { id } = props;

  const { findCategory } = useFindCategoryApi();

  const { data, isError, error, isPending: isCategoryFetching } = useQuery({
    queryKey: ["CategoryShow"],
    queryFn: () => findCategory({id}),
    refetchOnReconnect: true,
    retry: true,
  });

  return (<>
    <h2>Show category</h2>
    {
      isCategoryFetching
        ?
          <div style={{textAlign: 'center', padding: '50px'}}>
            <Spin/>
          </div>
        :
          isError
            ?
              <p>{ error.message }</p>
            :
              <Category category={data?.data} />
    }
  </>);
}