import React from "react";
import { Link, useLocation } from "react-router-dom";

// تعريف الـ Interfaces لضمان الـ Type Safety
interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const LeftSidebar: React.FC = () => {
  const location = useLocation();

  // قائمة الروابط الأساسية كما ظهرت في ملفاتكم
  const navItems: NavItem[] = [
    { path: "/chats", icon: "chat_bubble", label: "Chats" },
    { path: "/groups", icon: "groups", label: "Communities" },
    { path: "/bookmarks", icon: "bookmarks", label: "Saved" },
    { path: "/jobs", icon: "work_outline", label: "Jobs" },
    { path: "/calls", icon: "call", label: "Calls" },
  ];

  // دالة للتأكد لو المسار الحالي هو الأكتيف
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    // 1. الكلاسات الأساسية للسايد بار بناءً على ملفات الـ HTML بتاعتكم
    // Width ثابت (w-16)، h-screen، items-center عشان نضمن التوسيط
    <aside className="w-16 h-screen flex flex-col items-center py-6 bg-white dark:bg-[#171717] border-r border-gray-100 dark:border-white/5 shrink-0 transition-colors duration-300 z-20 overflow-y-auto hide-scrollbar">
      {/* 2. اللوجو الرئيسي (hub) بنفس مقاس الـ HTML */}
      <div className="mb-8">
        <Link
          to="/chats"
          className="w-11 h-11 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="material-icons-round text-[26px]">hub</span>
        </Link>
      </div>

      {/* 3. قائمة الـ Navigation الرئيسية - gap-5 و items-center */}
      <nav className="flex flex-col items-center gap-5 w-full">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.label}
            // الكلاسات دي بتعمل التنسيق المظبوط للأيقونة (w-11, rounded-2xl)
            // وبتنورها (Active) لما المسار يطابق
            className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${
              isActive(item.path)
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                : "text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10"
            }`}
          >
            <span className="material-icons-round text-[24px]">
              {item.icon}
            </span>
          </Link>
        ))}
      </nav>

      {/* 4. الجزء السفلي (الاعدادات والبروفايل) بنفس تصميمكم */}
      <div className="flex flex-col items-center gap-6 mt-auto pb-4">
        {/* رابط الإعدادات - زرار الـ Dark Mode هيكون جوا صفحة الـ Settings نفسها */}
        <Link
          to="/settings"
          title="Settings"
          className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${
            isActive("/settings")
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10"
          }`}
        >
          <span className="material-icons-round text-[24px]">settings</span>
        </Link>

        {/* البروفايل الشخصي - "YO" كما في تصميمك */}
        <Link to="/profile">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-[12px] font-bold ring-2 ring-purple-200 dark:ring-purple-900 ring-offset-2 ring-offset-white dark:ring-offset-[#171717] cursor-pointer hover:ring-purple-400 transition-all">
            YO
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default LeftSidebar;
