import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleTheme } from "../store/slices/themeSlice";
import { logout } from "../store/slices/authSlice";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#FAFAFA] dark:bg-[#171717] overflow-y-auto transition-colors duration-300">
      <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
        
        <h1 className="text-2xl font-bold mb-8 px-2 text-[#171717] dark:text-[#F5F5F5]">Settings</h1>

        {/* Profile Card */}
        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-4 p-4 mb-6 bg-white dark:bg-[#262626] rounded-2xl border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xl font-bold border-2 border-[#7C3AED] dark:border-[#8B5CF6] p-0.5">
              {user?.fullName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#262626] rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-[#171717] dark:text-[#F5F5F5] truncate">{user?.fullName || 'User Name'}</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 truncate">{user?.jobTitle || 'ITI Community Member'}</p>
          </div>
          <span className="text-[#7C3AED] dark:text-[#8B5CF6] shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>

        <div className="space-y-2">
          
          {/* Account Section */}
          <div className="bg-white dark:bg-[#262626] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5">
            <div className="p-2 border-b border-gray-50 dark:border-white/5 opacity-40 px-4 py-2 uppercase text-[10px] font-bold tracking-widest">Account</div>
            
            <div 
              onClick={() => navigate('/edit-profile')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-icons-round text-[22px]">person</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Profile & Identity</h4>
                <p className="text-xs text-gray-400">Name, Bio, ITI Track</p>
              </div>
            </div>

            <div onClick={() => navigate('/privacy')} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <span className="material-icons-round text-[22px]">lock</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Privacy</h4>
                <p className="text-xs text-gray-400">Last seen, Profile photo, Blocked users</p>
              </div>
              <span className="material-icons-round text-gray-300 dark:text-gray-600 text-[18px]">chevron_right</span>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-[#262626] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 mt-4">
            <div className="p-2 border-b border-gray-50 dark:border-white/5 opacity-40 px-4 py-2 uppercase text-[10px] font-bold tracking-widest">Preferences</div>

            {/* Theme Toggle */}
            <div 
              onClick={handleToggleTheme}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-indigo-900/30 flex items-center justify-center text-orange-500 dark:text-indigo-400 transition-colors">
                <span className="material-icons-round text-[24px]">{isDark ? 'dark_mode' : 'light_mode'}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Appearance</h4>
                <p className="text-xs text-gray-400">{isDark ? 'Dark mode active' : 'Light mode active'}</p>
              </div>
              <div className={`w-12 h-7 rounded-full relative transition-all duration-300 cursor-pointer shrink-0 ${isDark ? 'bg-[#8B5CF6]' : 'bg-gray-200'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>

            {/* Notifications */}
            <div 
              onClick={() => navigate('/notifications')}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-icons-round text-[22px]">notifications</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Notifications</h4>
                <p className="text-xs text-gray-400">Messages, Groups, Job Alerts</p>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <span className="material-icons-round text-[22px]">bolt</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Rabta AI Assistant</h4>
                <p className="text-xs text-gray-400">Job matching, recommendations</p>
              </div>
            </div>
          </div>

          {/* Logout & Footer */}
          <div className="mt-8 flex flex-col gap-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span className="font-bold text-sm">Log Out</span>
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-4">Rabta for ITI Community • Version 1.0.0</p>
          </div>

        </div>
      </div>
    </main>
  );
};
