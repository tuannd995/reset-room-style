"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";
import MarkdownEditor from "@/app/admin/components/MarkdownEditor";

export default function PostEditPage() {
  const { formProps, saveButtonProps } = useForm();
  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Excerpt" name="excerpt">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Content (Markdown)" name="content">
          <MarkdownEditor minHeight={360} />
        </Form.Item>
        <Form.Item label="Featured image URL" name="featured_image">
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category_id"
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="SEO title" name="seo_title">
          <Input />
        </Form.Item>
        <Form.Item label="SEO description" name="seo_description">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}
