import React, { useEffect } from "react";
import {Button, Form, Input, InputNumber, Select} from "antd";

import type { ProductFormInterface } from "../model";
import {CategorySelect} from "../../Category";
import TextArea from "antd/es/input/TextArea";

interface ProductFormPropsInterface {
  btnText: string;
  disabled?: boolean;
  onSubmit: () => void;
  value: ProductFormInterface;
  onChange: (value: ProductFormInterface) => void;
}

export const ProductForm: React.FC<ProductFormPropsInterface> = (props: ProductFormPropsInterface): React.ReactNode => {
  const { value, disabled = false, onChange, onSubmit, btnText } = props;

  const [form] = Form.useForm();

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange({
      ...value,
      name: e.target.value,
    });
  }

  function onPriceChange(event: number | null): void {
    onChange({
      ...value,
      price: event!,
    });
  }

  function onCategoryIdChange(event: number): void {
    onChange({
      ...value,
      category_id: event,
    });
  }

  function onSkuChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange({
      ...value,
      sku: e.target.value,
    });
  }

  function onDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    onChange({
      ...value,
      description: e.target.value,
    });
  }

  useEffect(() => {
    form.setFieldsValue({
      ...value,
    });
  }, [value]);

  return (
    <Form
      form={form}
      disabled={disabled}
      onFinish={onSubmit}
      name="createCategory"
      initialValues={{ remember: true }}
      style={{ gap: '30px', display: 'flex', flexDirection: 'column' }}
    >
      <Form.Item
        name="category_id"
        label="Product"
        layout="vertical"
        style={{ minHeight: '30px' }}
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <CategorySelect
          placeholder="Select category"
          value={value.category_id}
          onChange={onCategoryIdChange}
        />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
        label="Name"
        layout="vertical"
        style={{ minHeight: '30px' }}
      >
        <Input placeholder="Name" onChange={onNameChange} />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Price is required" },
          { type: "number", min: 0, message: "Price min value is 0" },
        ]}
        label="Price"
        layout="vertical"
        style={{ minHeight: '30px' }}
      >
        <InputNumber value={value.price} placeholder="Price" onChange={onPriceChange} />
      </Form.Item>

      <Form.Item
        name="sku"
        rules={[
          { required: true, message: "Sku is required" },
          { min: 3, max: 6, message: "Sku length should be greater than 3 and less than 6" },
        ]}
        label="Sku"
        layout="vertical"
        style={{ minHeight: '30px' }}
      >
        <Input placeholder="Sku" onChange={onSkuChange} />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[
          { required: true, message: "Description is required" },
        ]}
        label="Description"
        layout="vertical"
        style={{ minHeight: '100px' }}
      >
        <TextArea
          value={value.description}
          placeholder="Description"
          onChange={onDescriptionChange}
          style={{ resize: 'none' }}
          rows={4}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{width: 150}} htmlType="submit" block>
          { btnText }
        </Button>
      </Form.Item>
    </Form>
  );
}