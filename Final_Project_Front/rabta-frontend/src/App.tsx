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

// صفحات تجريبية علشان لما ندوس على السايد بار نلاقي حاجة (ممكن تمسحهم بعدين)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-10 text-3xl text-gray-800 dark:text-gray-100">{title}</div>
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
