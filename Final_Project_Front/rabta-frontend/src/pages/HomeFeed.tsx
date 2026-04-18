import React, { useState, useEffect } from 'react';
import { ChatsList } from '../components/chat/ChatsList';
import type { ChatItem } from '../components/chat/ChatsList';
import { ChatWindow, type MessageType } from '../components/chat/ChatWindow';
import { EmptyChatState } from '../components/chat/EmptyChatState';

export const HomeFeed = () => {
  // 1. State: تخزين المحادثات والرسائل (دايناميك بالكامل)
  const [chats] = useState<ChatItem[]>([]);
  const [messages] = useState<MessageType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  // 2. State: التحكم في النوافذ المنبثقة
  const [showAiPopup, setShowAiPopup] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);

 // 3. Effect: جلب قائمة المحادثات من الباك-إند (عند فتح الصفحة)
  useEffect(() => {
    // TODO (Backend): استبدل هذا الجزء بـ Axios Fetch
    // مثال:
    // axios.get('/api/chats').then(response => setChats(response.data));
    
    // مش محتاجين نعمل setChats([]) هنا لأن الـ State الابتدائية بالفعل فارغة []
  }, []);

  // 4. Effect: جلب الرسائل لما اليوزر يختار شات معين
  useEffect(() => {
    if (activeChatId) {
      // TODO (Backend): استبدل هذا الجزء بـ Axios Fetch لرسائل الشات المحدد
      // مثال:
      // axios.get(`/api/chats/${activeChatId}/messages`).then(response => setMessages(response.data));
      
      // مش محتاجين نعمل setMessages([]) هنا لنفس السبب
    }
  }, [activeChatId]);

  // تحديد بيانات الشات المفتوح حالياً لتمريرها كـ Props
  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <div className="flex w-full h-full bg-[#FAFAFA] dark:bg-[#171717] overflow-hidden relative">
      
      {/* 1. قائمة المحادثات (تستقبل الـ State الدايناميك) */}
      <ChatsList 
        chats={chats} 
        activeChatId={activeChatId} 
        onSelectChat={setActiveChatId} 
      />

      {/* 2. مساحة المحتوى: لو فيه شات اختاره افتحه، غير كده هات الشاشة الفاضية */}
      {activeChatId && activeChat ? (
        <ChatWindow 
          chatName={activeChat.name} 
          isOnline={activeChat.isOnline || false} 
          messages={messages} 
        />
      ) : (
        <EmptyChatState onNewMessage={() => setShowNewMessage(true)} />
      )}

      {/* 3. الـ AI Popup */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[100]">
        {showAiPopup && (
          <div className="w-80 bg-white dark:bg-[#262626] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col">
            <div className="bg-[#7C3AED] dark:bg-[#8B5CF6] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-bold text-sm">Rabta AI</span>
              </div>
              <button onClick={() => setShowAiPopup(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <span className="material-icons-round text-sm">close</span>
              </button>
            </div>
            <div className="h-48 bg-[#FAFAFA] dark:bg-[#171717] p-4 text-sm text-gray-500 italic">How can I help you today?</div>
            <div className="p-4 bg-white dark:bg-[#262626] border-t border-gray-100 dark:border-gray-800">
              <input type="text" placeholder="Type a message..." className="w-full text-sm p-2.5 rounded-xl bg-gray-50 dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] outline-none border border-transparent focus:border-[#7C3AED]" />
            </div>
          </div>
        )}
        <button onClick={() => setShowAiPopup(!showAiPopup)} className="w-12 h-12 bg-[#7C3AED] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <span className="material-icons-round">bolt</span>
        </button>
      </div>

      {/* 4. نافذة رسالة جديدة (New Message Modal) */}
      {showNewMessage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNewMessage(false)}></div>
          <div className="bg-white dark:bg-[#262626] w-full max-w-md rounded-2xl shadow-2xl relative z-10 flex flex-col overflow-hidden">
             <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-lg text-[#171717] dark:text-[#F5F5F5]">New Message</h3>
                <button onClick={() => setShowNewMessage(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <span className="material-icons-round">close</span>
                </button>
             </div>
             <div className="p-4">
               {/* Search Input */}
               <div className="relative mb-4">
                  <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                  <input type="text" placeholder="Search contacts..." className="w-full pl-9 pr-4 py-2.5 bg-[#FAFAFA] dark:bg-[#171717] border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-[#171717] dark:text-[#F5F5F5]" />
               </div>
               {/* Contacts List (ستأتي أيضاً من الباك-إند) */}
               <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                 Suggested contacts will appear here...
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};