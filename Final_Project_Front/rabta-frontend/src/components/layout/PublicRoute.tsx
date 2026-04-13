/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// التعديل الجوهري: إضافة كلمة type عشان الـ Vite يفهم إنه مجرد Type مش كود
import type { RootState } from "../../store/store";

export const PublicRoute = () => {
  // بنشيك على الـ token من الـ Redux state
  const token = useSelector((state: RootState) => state.auth.token);

  // لو اليوزر مسجل دخول (معاه توكن) وبيحاول يفتح صفحة اللوجين، بنوديه للـ chats فوراً
  if (token) {
    return <Navigate to="/chats" replace />;
  }

  // لو مش مسجل دخول، بنسيبه يكمل لصفحات الـ Login أو Signup عادي
  return <Outlet />;
};