import { Button, Form, Input } from "antd";
import React, {useEffect} from "react";

import type { CategoryFormInterface } from "../model";

interface CategoryFormPropsInterface {
  btnText: string;
  disabled?: boolean;
  onSubmit: () => void;
  value: CategoryFormInterface;
  onChange: (value: CategoryFormInterface) => void;
}

export const CategoryForm: React.FC<CategoryFormPropsInterface> = (props: CategoryFormPropsInterface): React.ReactNode => {
  const { value, disabled = false, onChange, onSubmit, btnText } = props;

  const [form] = Form.useForm();

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange({
      ...value,
      name: e.target.value,
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
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
        label="Name"
        layout="vertical"
        style={{ minHeight: '30px' }}
      >
        <Input placeholder="Name" onChange={onNameChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={{width: 150}} htmlType="submit">
          { btnText }
        </Button>
      </Form.Item>
    </Form>
  );
}