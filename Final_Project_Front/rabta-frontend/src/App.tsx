import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { PublicRoute } from "./components/layout/PublicRoute";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Settings } from "./pages/Settings";
import { ForgotPassword } from "./pages/ForgotPassword";
import { MainLayout } from "./components/layout/MainLayout";
import { HomeFeed } from "./pages/HomeFeed";
import { GroupsFeed } from "./pages/GroupsFeed";
import Profile from './pages/Profile'; // تأكدي إن الملف ده موجود في src/pages/Profile.tsx
import EditProfile from './pages/EditProfile'; // تأكدي إن الملف ده موجود في src/pages/EditProfile.tsx
import SetupProfile from './pages/SetupProfile'; // تأكدي إن الملف ده موجود في src/pages/SetupProfile.tsx   
import { SavedContent } from './pages/SavedPage'; // تأكدي إن الملف ده موجود في src/pages/SavedContent.tsx
import  Notifications from './pages/Notifications'; // تأكدي إن الملف ده موجود في src/pages/Notifications.tsx

// سكشن الصفحات المؤقتة
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full p-10 text-3xl text-gray-800 dark:text-gray-100">
    {title} - Coming Soon
  </div>
);

function App() {
  return (
  <Routes>
  {/* 1. التوجيه التلقائي */}
  <Route path="/" element={<Navigate to="/login" replace />} />
  
  {/* 2. مسارات عامة: متاحة فقط لمن لم يسجل دخول (Login, Signup) */}
  <Route element={<PublicRoute />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

  </Route>

  {/* 3. مسارات محمية: تتطلب تسجيل دخول وتستخدم الـ MainLayout (عشان السايد بار يظهر) */}
  <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>
      {/* الصفحات الأساسية */}
      <Route path="/chats" element={<HomeFeed />} />
      <Route path="/groups" element={<GroupsFeed />} />
      
      {/* صفحة المحفوظات - نقلناها هنا عشان السايد بار يظهر معاها */}
      <Route path="/saved" element={<SavedContent />} />
      <Route path="/bookmarks" element={<PlaceholderPage title="Saved Bookmarks" />} />

      {/* صفحات البروفايل اللي إنتِ عملتيها */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/setup-profile" element={<SetupProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* صفحات إضافية */}
      <Route path="/jobs" element={<PlaceholderPage title="Jobs Board" />} />
      <Route path="/calls" element={<PlaceholderPage title="Calls History" />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
    </Route>
  </Route>

  {/* 4. معالجة الروابط الخطأ */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  );
}
export default App;