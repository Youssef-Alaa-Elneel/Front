import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export const MainLayout = () => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  // تحديد أي زرار في السايدبار مفعّل بناءً على المسار الحالي
  const navItems = [
    { to: "/chats", icon: "chat_bubble", title: "Chats" },
    { to: "/groups", icon: "groups", title: "Communities" },
    { to: "/bookmarks", icon: "bookmarks", title: "Saved" },
    { to: "/jobs", icon: "work_outline", title: "Jobs" },
    { to: "/calls", icon: "call", title: "Calls" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] transition-colors duration-300">
      
      {/* Sidebar - Hidden on mobile, shown on sm+ */}
      <aside className="hidden sm:flex w-16 h-screen flex-col items-center py-6 bg-white dark:bg-[#171717] border-r border-gray-100 dark:border-white/5 shrink-0 transition-colors duration-300 z-20 overflow-y-auto no-scrollbar">
        
        {/* Logo */}
        <div className="mb-8">
          <NavLink to="/chats" className="w-11 h-11 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 cursor-pointer hover:scale-105 transition-transform">
            <span className="material-icons-round text-[26px]">hub</span>
          </NavLink>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col items-center gap-5 w-full">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.title}
                className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10'
                }`}
              >
                <span className="material-icons-round text-[24px]">{item.icon}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Nav */}
        <div className="flex flex-col items-center gap-6 mt-auto pb-4">
          <NavLink
            to="/settings"
            title="Settings"
            className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${
              location.pathname === '/settings'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10'
            }`}
          >
            <span className="material-icons-round text-[24px]">settings</span>
          </NavLink>

          <NavLink
            to="/profile"
            className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-[12px] font-bold ring-2 ring-purple-200 dark:ring-purple-900 ring-offset-2 ring-offset-white dark:ring-offset-[#171717] cursor-pointer hover:ring-purple-400 transition-all"
          >
            {user?.fullName?.[0]?.toUpperCase() || 'U'}
          </NavLink>
        </div>
      </aside>

      {/* Mobile Bottom Bar - Shown on mobile only */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#1E1E1E] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-50 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[#7C3AED] dark:text-[#8B5CF6]'
                  : 'text-gray-400'
              }`}
            >
              <span className="material-icons-round text-[22px]">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
        <NavLink
          to="/settings"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            location.pathname === '/settings'
              ? 'text-[#7C3AED] dark:text-[#8B5CF6]'
              : 'text-gray-400'
          }`}
        >
          <span className="material-icons-round text-[22px]">settings</span>
          <span className="text-[10px] font-medium">More</span>
        </NavLink>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden pb-16 sm:pb-0">
        <Outlet />
      </main>
    </div>
  );
};
