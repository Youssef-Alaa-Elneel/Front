import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// TODO: Move to Redux (Aya) - This token check will be replaced by Redux state selector
export const ProtectedRoute = () => {
  // بنشيك لو في توكن في المتصفح ولا لا
  const token = localStorage.getItem("token");

  // لو مفيش توكن، اطرده على صفحة اللوجين
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // لو في توكن، خليه يكمل ويدخل الصفحة اللي هو عايزها
  return <Outlet />;
};
