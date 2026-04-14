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
import { Splash } from "./pages/Splash";
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
      {/* التوجيه الافتراضي: هيروح للتشات، لو معاه توكن هيدخل، لو معندوش الحارس هيطرده للوجين */}
      <Route path="/" element={<Splash />} />{" "}
      {/* === الحارس الأول: الصفحات العامة (للي مش مسجل دخول) === */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      {/* === الحارس التاني: الصفحات المحمية (للمسجلين دخول فقط) === */}
      <Route element={<ProtectedRoute />}>
        {/* التعديل هنا: غلفنا الصفحات بالـ MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/chats" element={<HomeFeed />} />
          <Route path="/groups" element={<GroupsFeed />} />
          <Route
            path="/bookmarks"
            element={<PlaceholderPage title="Saved Bookmarks" />}
          />
          <Route
            path="/jobs"
            element={<PlaceholderPage title="Jobs Board" />}
          />
          <Route
            path="/calls"
            element={<PlaceholderPage title="Calls History" />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/profile"
            element={<PlaceholderPage title="User Profile" />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;