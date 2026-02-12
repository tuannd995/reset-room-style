"use client";

import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export default function ProductListPage() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="short_description"
          title="Description"
          ellipsis
        />
        <Table.Column dataIndex="created_at" title="Created" />
      </Table>
    </List>
  );
}
