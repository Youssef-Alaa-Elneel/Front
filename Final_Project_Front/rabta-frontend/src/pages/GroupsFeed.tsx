// src/pages/GroupsFeed.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { ChatWindow } from '../components/chat/ChatWindow';

// ==========================================
// 1. Interfaces
// ==========================================
export interface GroupType {
  _id: string;
  name: string;
  category: string; // 💡 الحقل اللي هنفلتر بيه (Programming, UI/UX, الخ)
  avatar?: string;
  description?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface GroupsApiResponse {
  status: string;
  data: GroupType[];
}

// ==========================================
// 2. Component
// ==========================================
export const GroupsFeed = () => {
  const navigate = useNavigate();

  // --- States ---
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<GroupType | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 💡 التصنيفات الثابتة
  const filters = ["All", "Programming", "UI/UX", "Back-End", "Front-End", "Mobile", "2D"];

  // --- Fetch Groups ---
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<GroupsApiResponse>('/v1/groups');
        
        setGroups(response.data.data || []);
      } catch (err) {

        // 💡 لا نضيف داتا وهمية - الـ UI هيعرض Empty State
        setGroups([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // --- Filter Logic ---
  const filteredGroups = groups.filter(group => {
    // فلترة بالتصنيف
    const matchesCategory = activeFilter === "All" || group.category === activeFilter;
    // فلترة بالبحث
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex w-full h-full bg-[#FAFAFA] dark:bg-[#171717] relative">
      
      {/* ================= Left Sidebar (Communities List) ================= */}
      <aside className="w-[320px] bg-[#FAFAFA] dark:bg-[#171717] flex flex-col h-full border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 z-40 relative min-h-0 shrink-0">
        
        {/* Header & Search */}
        <div className="p-4 flex flex-col gap-4 shrink-0 border-b border-gray-100 dark:border-gray-800">
          
          <div className="flex items-center justify-between text-[#171717] dark:text-[#F5F5F5]">
            <span className="text-xl font-bold tracking-tight">Communities</span>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-800 rounded-lg py-2 pl-10 pr-4 text-[#171717] dark:text-[#F5F5F5] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all text-sm"
              placeholder="Search communities"
              type="text"
            />
          </div>

          {/* الفلاتر (Categories) */}
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

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {isLoading ? (
             <p className="text-center p-4 text-gray-400 animate-pulse text-sm">Loading communities...</p>
          ) : filteredGroups.length === 0 ? (
             <div className="flex flex-col items-center justify-center p-8 text-center">
               <div className="w-16 h-16 bg-gray-100 dark:bg-[#262626] rounded-full flex items-center justify-center mb-4">
                 <span className="material-icons-round text-3xl text-gray-300 dark:text-gray-600">groups</span>
               </div>
               <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">No groups available</p>
               <p className="text-xs text-gray-400 dark:text-gray-500">Create a new community or adjust your filters.</p>
             </div>
          ) : (
            filteredGroups.map((group) => {
              const isActive = activeGroup?._id === group._id;
              
              return (
                <div 
                  key={group._id}
                  onClick={() => setActiveGroup(group)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4 ${
                    isActive 
                      ? 'bg-white dark:bg-[#262626] border-[#7C3AED] shadow-sm' 
                      : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={group.avatar || '/default-group.png'} 
                      alt={group.name} 
                      className="w-12 h-12 rounded-2xl object-cover border border-gray-100 dark:border-gray-800" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-[#171717] dark:text-[#F5F5F5]' : 'text-[#171717] dark:text-[#F5F5F5]'}`}>
                        {group.name}
                      </h3>
                      {group.unreadCount && group.unreadCount > 0 ? (
                        <span className="text-[#7C3AED] text-[10px] font-bold">{group.unreadCount} New</span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">{group.lastMessageTime}</span>
                      )}
                    </div>
                    <p className={`text-xs truncate ${group.unreadCount && group.unreadCount > 0 ? 'text-[#171717] dark:text-[#F5F5F5] font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {group.lastMessage || 'Start the conversation!'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* ================= Right Area (ChatWindow or Empty State) ================= */}
      {activeGroup ? (
        <ChatWindow 
          chatName={activeGroup.name}
          isOnline={true} // أو يمكن برمجتها بناءً على حالة الجروب
          messages={[]} // 💡 هنا سيتم تمرير رسايل الجروب بعد جلبها من الباك-إند
          isGroupChat={true} // 💡 👈👈 هذا هو السر الذي يفعل زر المودال (+) في الشات!
        />
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-[#FAFAFA] dark:bg-[#171717]">
          <div className="w-24 h-24 bg-gray-100 dark:bg-[#262626] rounded-full flex items-center justify-center mb-4 border-8 border-white dark:border-[#171717]">
             <span className="material-icons-round text-5xl opacity-50">groups</span>
          </div>
          <h3 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F5] mb-2">Community Hub</h3>
          <p className="text-sm font-medium text-center max-w-sm">
            Select a community from the left to start sharing knowledge, or create a new one.
          </p>
        </main>
      )}
    </div>
  );
};