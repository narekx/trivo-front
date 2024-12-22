import { CategoryInterface } from "../model";
import {Card} from "antd";


interface CategoryPropsInterface {
  category: CategoryInterface;
}

export const Category: React.FC<CategoryPropsInterface> = (props: CategoryPropsInterface): React.ReactNode => {
  const { category } = props;

  return (
    <div>
      <Card
        style={{ marginBottom: 10 }}
        type="inner"
        title={`Category: ${category.name}`}
      >
        <p><strong>Id:</strong> {category.id}</p>
        <p><strong>Name:</strong> {category.name}</p>
        <p><strong>Created At:</strong> {category.createdAt}</p>
        <p><strong>Updated At:</strong> {category.updatedAt}</p>
      </Card>
    </div>
  );
}