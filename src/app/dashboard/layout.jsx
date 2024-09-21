import AdminLayout from "@/components/layout/AdminLayout";
import AdminRoute from "@/components/privateRoute/AdminRoute";
import React from "react";

const layout = ({ children }) => {
  return (
    <AdminRoute>
      <AdminLayout>{children}</AdminLayout>
    </AdminRoute>
  );
};

export default layout;
