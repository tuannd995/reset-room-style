"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export default function ProductEditPage() {
  const { formProps, saveButtonProps } = useForm();
  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Short description" name="short_description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Image URL" name="image">
          <Input />
        </Form.Item>
        <Form.Item label="Amazon link" name="amazon_link">
          <Input />
        </Form.Item>
        <Form.Item label="Rating" name="rating">
          <InputNumber min={0} max={5} step={0.1} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
}
