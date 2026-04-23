import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoute } from "./components/layout/PublicRoute";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Settings } from "./pages/Settings";
import { ForgotPassword } from "./pages/ForgotPassword";
import { MainLayout } from "./components/layout/MainLayout";
import { HomeFeed } from "./pages/HomeFeed";
import { GroupsFeed } from "./pages/GroupsFeed";
import { Splash } from "./pages/Splash";

// استدعاء صفحات البروفايل
import Profile from "./pages/Profile";
import EditProfile from './pages/EditProfile';
import SetupProfile from './pages/SetupProfile';   
import { SavedContent } from './pages/SavedPage'; 
import Notifications from './pages/Notifications';
import { CallsPage } from "./pages/CallsPage";
// استدعاء صفحات الجروبات
import CreateGroup from './components/Groups/CreateGroup'; 
import JoinGroup from './components/Groups/JoinGroup';
import { ViewContact } from './pages/ViewContact';
import { SharedContent } from './pages/SharedContent';
// 💡 استدعاء صفحات الوظائف (اللي كانت ناقصة)
import { JobsBoard } from "./pages/JobsBoard";
import { JobDetails } from "./pages/JobDetails";

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

      {/* الصفحات المفتوحة (بدون حماية مؤقتاً للاختبار) */}
      <Route element={<MainLayout />}>
        <Route path="/chats" element={<HomeFeed />} />
        
        {/* مسارات الجروبات */}
        <Route path="/groups" element={<GroupsFeed />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/join-group" element={<JoinGroup />} />
        
        {/* 💡 مسارات الوظائف */}
        <Route path="/jobs" element={<JobsBoard />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/contact" element={<ViewContact />} />
<Route path="/shared-content" element={<SharedContent />} />
        {/* مسارات البروفايل */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/bookmarks" element={<SavedContent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* استخدام Navigate هنا عشان أي لينك غلط يرجع للسبلاش */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;