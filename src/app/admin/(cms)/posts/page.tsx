"use client";

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

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
                confirmTitle="Delete this post?"
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
