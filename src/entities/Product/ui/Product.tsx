import { Card } from "antd";
import type { ProductInterface } from "../model";


interface ProductPropsInterface {
  product: ProductInterface;
}

export const Product: React.FC<ProductPropsInterface> = (props: ProductPropsInterface): React.ReactNode => {
  const { product } = props;

  return (
    <div>
      <Card
        style={{ marginBottom: 10 }}
        type="inner"
        title={`Product: ${product.name}`}
      >
        <p><strong>Id:</strong> {product.id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {product.category.id}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Sku:</strong> {product.sku}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Created At:</strong> {product.createdAt}</p>
        <p><strong>Updated At:</strong> {product.updatedAt}</p>
      </Card>
    </div>
  );
}