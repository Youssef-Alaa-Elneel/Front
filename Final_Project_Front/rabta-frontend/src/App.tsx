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
import GroupDetails from './components/Groups/GroupDetails';
import { ViewContact } from './pages/ViewContact';
import { SharedContent } from './pages/SharedContent';
// 💡 استدعاء صفحات الوظائف
import { JobsBoard } from "./pages/JobsBoard";
import { JobDetails } from "./pages/JobDetails";
// 💡 صفحة تفاصيل البوست
import { PostDetails } from "./pages/PostDetails";
// 💡 صفحة الخصوصية
import { Privacy } from "./pages/Privacy";
// 💡 صفحات الشركات / العملاء
import { EmployerProfile } from "./pages/EmployerProfile";
import { EmployerSetupProfile } from "./pages/EmployerSetupProfile";
import { ProjectDetails } from "./pages/ProjectDetails";

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
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/groups/:id/chat" element={<GroupDetails />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/join-group" element={<JoinGroup />} />
        
        {/* 💡 مسار تفاصيل البوست */}
        <Route path="/posts/:postId" element={<PostDetails />} />
        
        <Route path="/jobs" element={<JobsBoard />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/employer/:employerId" element={<EmployerProfile />} />
        <Route path="/employer-setup" element={<EmployerSetupProfile />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/contact" element={<ViewContact />} />
        <Route path="/shared-content" element={<SharedContent />} />

        {/* مسارات البروفايل */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/bookmarks" element={<SavedContent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* استخدام Navigate هنا عشان أي لينك غلط يرجع للسبلاش */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;