// src/pages/GroupsFeed.tsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const GroupsFeed = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Programming", "UI/UX", "Back-End", "Mobile"];
  const navigate = useNavigate();
  
  return (
    <div className="flex w-full h-full bg-[#FAFAFA] dark:bg-[#171717]">
      {/* عمود المجتمعات (Communities List) */}
      <aside className="w-[320px] bg-[#FAFAFA] dark:bg-[#171717] flex flex-col h-full border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 z-40 relative min-h-0 shrink-0">
        <div className="p-4 flex flex-col gap-4 shrink-0">
          
          {/* تم تعديل هذا الجزء لضبط حجم الزرار */}
          <div className="flex items-center justify-between text-[#171717] dark:text-[#F5F5F5]">
            <span className="text-xl font-bold tracking-tight">
              Communities
            </span>
            <button 
              onClick={() => navigate('/create-group')}
              className="flex items-center justify-center gap-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95"
              title="Create New Group"
            >
              <span className="material-icons-round text-sm">add</span>
              Create
            </button>
          </div>

          <div className="relative group">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
              search
            </span>
            <input
              className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-800 rounded-lg py-2 pl-10 pr-4 text-[#171717] dark:text-[#F5F5F5] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all text-sm"
              placeholder="Search communities"
              type="text"
            />
          </div>

          {/* الفلاتر */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all shadow-sm ${
                  activeFilter === filter
                    ? "bg-[#7C3AED] text-white shadow-[#7C3AED]/20"
                    : "bg-white dark:bg-[#262626] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-[#7C3AED]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* قائمة الجروبات */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#262626] border-l-4 border-[#7C3AED] cursor-pointer shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] shrink-0">
              <span className="material-icons-round">terminal</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[#171717] dark:text-[#F5F5F5] font-semibold text-sm truncate">
                  Node.js Masters
                </h3>
                <span className="text-[#7C3AED] text-[10px] font-bold">
                  12 New
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                Discussion about Event Loop...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 shrink-0">
              <span className="material-icons-round">javascript</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[#171717] dark:text-[#F5F5F5] font-semibold text-sm truncate">
                  React Ecosystem
                </h3>
                <span className="text-gray-400 text-[10px]">Yesterday</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                Best patterns for State Management
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* منطقة المحتوى (اليمين) */}
      <main className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-[#FAFAFA] dark:bg-[#171717]">
        <span className="material-icons-round text-6xl opacity-10">groups</span>
        <p className="text-sm mt-4 font-medium">
          Select a community to see the feed
        </p>
      </main>
    </div>
  );
};