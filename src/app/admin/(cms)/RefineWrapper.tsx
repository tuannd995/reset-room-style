"use client";

import { Refine } from "@refinedev/core";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider } from "@refinedev/supabase";
import { createClient } from "@/lib/supabase/browser";
import { authProvider } from "../providers/auth-provider";
import "@refinedev/antd/dist/reset.css";

const supabaseClient = createClient();

export function RefineWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      notificationProvider={useNotificationProvider}
      resources={[
        {
          name: "posts",
          list: "/admin/posts",
          create: "/admin/posts/create",
          edit: "/admin/posts/edit/:id",
          show: "/admin/posts/show/:id",
          meta: { label: "Posts" },
        },
        {
          name: "products",
          list: "/admin/products",
          create: "/admin/products/create",
          edit: "/admin/products/edit/:id",
          show: "/admin/products/show/:id",
          meta: { label: "Products" },
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      <ThemedLayout>{children}</ThemedLayout>
    </Refine>
  );
}
