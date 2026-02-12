"use client";

import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export default function PostListPage() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="is_published"
          title="Published"
          render={(v: boolean) => (v ? "Yes" : "No")}
        />
        <Table.Column dataIndex="created_at" title="Created" />
      </Table>
    </List>
  );
}
