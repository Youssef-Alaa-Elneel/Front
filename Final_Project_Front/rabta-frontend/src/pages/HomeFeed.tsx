import React from "react";

export const HomeFeed = () => {
  return (
    <div className="flex w-full h-full bg-[#FAFAFA] dark:bg-[#171717]">
      {/* عمود قائمة المحادثات (One-to-One List) */}
      <aside className="w-[320px] bg-[#FAFAFA] dark:bg-[#171717] flex flex-col h-full border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 z-40 relative min-h-0 shrink-0">
        {/* الهيدر: Rabta + Menu */}
        <div className="p-4 flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between text-[#171717] dark:text-[#F5F5F5]">
            <span className="text-xl font-bold tracking-tight">Rabta</span>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
              <span className="material-icons text-gray-400">menu</span>
            </button>
          </div>

          {/* مربع البحث */}
          <div className="relative group">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm"></span>
            <input
              className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-800 rounded-lg py-2 pl-10 pr-4 text-[#171717] dark:text-[#F5F5F5] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all text-sm"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        {/* قائمة المحادثات الفعليه */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* TODO (Aya): Map through individual chat objects from Redux */}

          {/* مثال لمحادثة نشطة (Active Chat) */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#262626] border-l-4 border-[#7C3AED] dark:border-[#8B5CF6] cursor-pointer shadow-sm">
            <div className="relative shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://ui-avatars.com/api/?name=David+Chen&background=7C3AED&color=fff"
                alt="Avatar"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#262626] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[#171717] dark:text-[#F5F5F5] font-semibold text-sm truncate">
                  David Chen
                </h3>
                <span className="text-[#7C3AED] dark:text-[#8B5CF6] text-xs font-medium">
                  10:42 AM
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                The PR for the dashboard is ready...
              </p>
            </div>
          </div>

          {/* مثال لمحادثة تانية (Normal Chat) */}
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold text-sm">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[#171717] dark:text-[#F5F5F5] font-semibold text-sm truncate">
                  Marcus Riley
                </h3>
                <span className="text-gray-400 text-xs">Yesterday</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                Check out these new UI mocks.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* منطقة الشات الرئيسية (اليمين) */}
      <main className="flex-1 flex flex-col bg-[#FAFAFA] dark:bg-[#171717] transition-colors duration-300 items-center justify-center text-gray-400">
        <span className="material-icons-round text-6xl opacity-10">chat</span>
        <p className="text-sm mt-4 font-medium">
          Select a chat to start messaging
        </p>
      </main>
    </div>
  );
};
