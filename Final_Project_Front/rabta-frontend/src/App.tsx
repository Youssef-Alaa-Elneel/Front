import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { PublicRoute } from "./components/layout/PublicRoute";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Settings } from "./pages/Settings";
import { ForgotPassword } from "./pages/ForgotPassword";
import LeftSidebar from "./components/layout/LeftSidebar"; // استيراد السايد بار الجديد

// صفحات تجريبية علشان لما ندوس على السايد بار نلاقي حاجة (ممكن تمسحهم بعدين)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-10 text-3xl text-gray-800 dark:text-gray-100">{title}</div>
);

function App() {
  const location = useLocation();

  // تحديد الصفحات اللي السايد بار مش المفروض يظهر فيها (زى صفحات الـ Auth)
  const hideSidebarRoutes = ["/login", "/signup", "/forgot-password", "/"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    // 1. الحاوية الأساسية: flex عشان تقسم الشاشة، h-screen لملئ الشاشة، و overflow-hidden لمنع أي أسكرول خارجي
    <div className="flex h-screen w-full bg-gray-50 dark:bg-[#121212] transition-colors duration-300 overflow-hidden text-gray-900 dark:text-gray-100">
      {/* 2. السايد بار المصمم بالمللي بناءً على ملفات الـ HTML بتاعتكم */}
      {showSidebar && <LeftSidebar />}

      {/* 3. حاوية المحتوى الرئيسي: flex-1 عشان تاخد باقي مساحة الشاشة أفقياً */}
      {/* overflow-y-auto و h-full عشان نضمن إن المحتوى بس هو اللي يتعمله أسكرول لو طول */}
      <main className="flex-1 h-full overflow-y-auto relative no-scrollbar">
        {/* الـ Nav المؤقت اللي كان في كودكم (ممكن تشيلوه بعدين) */}
        <nav className="p-4 bg-gray-100 dark:bg-gray-800 flex gap-4 justify-center border-b border-gray-200 dark:border-gray-700">
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Signup
          </Link>
          <Link
            to="/chats"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Chats
          </Link>
          <Link
            to="/settings"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Settings
          </Link>
        </nav>

        {/* 4. الـ Routes اللي بتعرض الصفحات */}
        {/* 4. الـ Routes اللي بتعرض الصفحات */}
        <Routes>
          {/* التوجيه الافتراضي: هيروح للتشات، لو معاه توكن هيدخل، لو معندوش الحارس هيطرده للوجين */}
          <Route path="/" element={<Navigate to="/chats" replace />} />

          {/* === الحارس الأول: الصفحات العامة (للي مش مسجل دخول) === */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* === الحارس التاني: الصفحات المحمية (للمسجلين دخول فقط) === */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/chats"
              element={<PlaceholderPage title="Chats Page" />}
            />
            <Route
              path="/groups"
              element={<PlaceholderPage title="Communities Page" />}
            />
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
