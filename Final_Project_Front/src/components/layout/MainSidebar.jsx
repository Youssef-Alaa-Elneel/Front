import React from "react";

const MainSidebar = () => {
  return (
    <aside className="w-16 flex flex-col items-center py-6 bg-rabta-light-surface dark:bg-rabta-dark-surface border-r border-gray-200 dark:border-gray-800 shrink-0 transition-colors duration-300 z-20 min-h-0 overflow-y-auto hide-scrollbar">
      <div className="mb-8">
        <div className="w-10 h-10 bg-rabta-light-primary/10 dark:bg-rabta-dark-primary/20 rounded-xl flex items-center justify-center text-rabta-light-primary dark:text-rabta-dark-primary">
          <span className="material-icons-round">hub</span>
        </div>
      </div>

      <nav className="flex flex-col gap-6">
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rabta-light-primary dark:hover:text-rabta-dark-primary transition-colors"
          title="Chats"
        >
          <span className="material-icons-round">chat_bubble</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center text-rabta-light-primary dark:text-rabta-dark-primary bg-rabta-light-primary/10 dark:bg-rabta-dark-primary/10 rounded-lg transition-colors"
          title="Groups"
        >
          <span className="material-icons-round">groups</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rabta-light-primary dark:hover:text-rabta-dark-primary transition-colors"
          title="Bookmarks"
        >
          <span className="material-icons-round">bookmarks</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rabta-light-primary dark:hover:text-rabta-dark-primary transition-colors"
          title="Jobs"
        >
          <span className="material-icons-round">work_outline</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rabta-light-primary dark:hover:text-rabta-dark-primary transition-colors"
          title="Calls"
        >
          <span className="material-icons-round">call</span>
        </button>
      </nav>

      <div className="mt-auto flex flex-col gap-6 items-center">
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rabta-light-primary dark:hover:text-rabta-dark-primary transition-colors"
          title="Settings"
        >
          <span className="material-icons-round">settings</span>
        </button>
        <img
          className="w-10 h-10 rounded-full border-2 border-rabta-light-primary/40 dark:border-rabta-dark-primary/40 object-cover cursor-pointer shrink-0"
          alt="User profile avatar circle"
          src="https://ui-avatars.com/api/?name=Youssef&background=7C3AED&color=fff&bold=true"
        />
      </div>
    </aside>
  );
};

export default MainSidebar;
