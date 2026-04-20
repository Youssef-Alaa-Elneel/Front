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

// استدعاء الصفحات اللي ESLint بيطلع فيها Error
import Profile from './pages/Profile'; 
import EditProfile from './pages/EditProfile';
import SetupProfile from './pages/SetupProfile';   
import { SavedContent } from './pages/SavedPage'; 
import Notifications from './pages/Notifications';

// 👇 ضفنا هنا استدعاء صفحات الكريت والجوين
import CreateGroup from './components/Groups/CreateGroup'; 
import JoinGroup from './components/Groups/JoinGroup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      {/* صفحة الـ Login والـ Signup */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* الصفحات المحمية */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/chats" element={<HomeFeed />} />
          <Route path="/groups" element={<GroupsFeed />} />
          
          {/* 👇 المسارات الجديدة للجروبات عشان الزرار يشتغل وميرجعكيش للرئيسية */}
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group" element={<JoinGroup />} />
          
          {/* هنا بنستخدم الصفحات عشان الـ Error يختفي */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/setup-profile" element={<SetupProfile />} />
          <Route path="/bookmarks" element={<SavedContent />} />
          <Route path="/notifications" element={<Notifications />} />
          
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* استخدام Navigate هنا عشان أي لينك غلط يرجع للسبلاش */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;