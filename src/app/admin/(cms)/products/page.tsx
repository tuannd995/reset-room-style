"use client";

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

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
        <Table.Column
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record: { id: string }) => (
            <Space>
              <EditButton size="small" recordItemId={record.id} />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                confirmTitle="Delete this product?"
                confirmOkText="Yes, delete"
                confirmCancelText="Cancel"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
