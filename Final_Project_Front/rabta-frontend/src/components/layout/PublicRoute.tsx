import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// TODO: Move to Redux (Aya) - This token check will be replaced by Redux state selector
export const PublicRoute = () => {
  const token = localStorage.getItem("token");

  // لو اليوزر اوريدي مسجل دخول وبيحاول يفتح صفحة اللوجين تاني، رجعه للـ chats
  if (token) {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
};
