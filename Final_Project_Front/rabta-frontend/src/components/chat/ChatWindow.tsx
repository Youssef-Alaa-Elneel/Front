import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostModal } from '../CreatePostModal'; 

// ==========================================
// 1. Interfaces
// ==========================================
export type MessageType = {
  id: string;
  type: 'text' | 'file' | 'audio';
  content?: string;
  fileName?: string;
  fileSize?: string;
  time: string;
  isMine: boolean;
};

interface ChatWindowProps {
  chatName: string;
  isOnline: boolean;
  messages: MessageType[];
  isGroupChat?: boolean;
  onSendMessage?: (content: string) => void;
}

// ==========================================
// 2. Component
// ==========================================
export const ChatWindow: React.FC<ChatWindowProps> = ({ chatName, isOnline, messages, isGroupChat = false, onSendMessage }) => {
  const navigate = useNavigate();

  const handleSend = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  // --- Header States ---
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Footer States ---
  const [newMessage, setNewMessage] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // --- Refs ---
  const callMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const attachMenuRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // إغلاق القوائم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target as Node)) setShowCallOptions(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) setShowMoreOptions(false);
      if (attachMenuRef.current && !attachMenuRef.current.contains(event.target as Node)) setShowAttachMenu(false);
      if (emojiMenuRef.current && !emojiMenuRef.current.contains(event.target as Node)) setShowEmojiPicker(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تايمر تسجيل الصوت
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const EMOJIS = ['😀','😂','😍','🙏','👍','🔥','✨','❤️','🎉','🤔','😎','😭'];

  return (
    <div className="flex-1 flex min-w-0 h-full relative">
      <main className="flex-1 flex flex-col bg-[#FAFAFA] dark:bg-[#171717] min-h-0 min-w-0 transition-colors duration-300 relative">
        
        {/* ================= Header ================= */}
        <header className="h-16 px-6 bg-white/80 dark:bg-[#262626]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-10 shrink-0 transition-colors flex items-center">
          {isSearchActive ? (
            <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-top-2">
              <button onClick={() => setIsSearchActive(false)} className="p-2 text-gray-400 hover:text-[#7C3AED] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <span className="material-icons-round">arrow_back</span>
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text" autoFocus placeholder="Search in conversation..." 
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl pl-4 pr-10 py-2.5 text-sm text-[#171717] dark:text-[#F5F5F5] outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-shadow"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <span className="material-icons-round text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col min-w-0 cursor-pointer" onClick={() => setShowUserDetails(!showUserDetails)}>
                <h2 className="text-[#171717] dark:text-[#F5F5F5] font-bold text-base truncate">{chatName}</h2>
                {isOnline && <span className="text-[#7C3AED] dark:text-[#8B5CF6] text-xs font-medium">Online</span>}
              </div>
              
              <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500 shrink-0">
                <div className="relative flex items-center" ref={callMenuRef}>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button className="px-2.5 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-[#7C3AED] transition-colors"><span className="material-icons-round text-[20px]">videocam</span></button>
                    <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
                    <button onClick={() => setShowCallOptions(!showCallOptions)} className="px-1 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-[#7C3AED] transition-colors"><span className="material-icons-round text-[18px]">arrow_drop_down</span></button>
                  </div>
                </div>

                <button onClick={() => setIsSearchActive(true)} className="hover:text-[#7C3AED] transition-colors p-1">
                  <span className="material-icons-round">search</span>
                </button>
                
                <div className="relative" ref={moreMenuRef}>
                  <button onClick={() => setShowMoreOptions(!showMoreOptions)} className="hover:text-[#7C3AED] transition-colors p-1">
                    <span className="material-icons-round">more_vert</span>
                  </button>
                  {showMoreOptions && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#262626] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden z-50 py-1">
                      <button onClick={() => navigate('/contact')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#171717] dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-white/5">
                        <span className="material-icons-round text-[18px] text-gray-400">account_circle</span> View Contact
                      </button>
                      <button onClick={() => navigate('/shared-content')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#171717] dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-white/5">
                        <span className="material-icons-round text-[18px] text-gray-400">folder_shared</span> Media, Links, and Docs
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#171717] dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-white/5"><span className="material-icons-round text-[18px] text-gray-400">notifications_off</span> Mute Notifications</button>
                      <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#171717] dark:text-[#F5F5F5] hover:bg-gray-50 dark:hover:bg-white/5"><span className="material-icons-round text-[18px] text-gray-400">cleaning_services</span> Clear Chat</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ================= Messages Area ================= */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4">
          <div className="flex justify-center my-4">
            <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'} w-full`}>
              {msg.type === 'text' ? (
                <div className={`${msg.isMine ? 'bg-[#7C3AED] text-white rounded-tr-none' : 'bg-white dark:bg-[#262626] text-[#171717] dark:text-[#F5F5F5] border border-gray-200 dark:border-gray-800 rounded-tl-none'} rounded-xl p-3 shadow-sm max-w-[80%]`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div className={`flex justify-end items-center gap-1 mt-1 ${msg.isMine ? 'text-white/80' : 'text-gray-400'}`}>
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.isMine && <span className="material-icons-round text-[12px]">done_all</span>}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-800 rounded-xl rounded-tl-none p-2 shadow-sm max-w-[80%]">
                  <div className="rounded-lg overflow-hidden mb-2">
                    <div className="bg-[#FAFAFA] dark:bg-[#171717] p-4 flex items-center gap-3 border border-gray-200 dark:border-gray-800">
                      <div className="w-10 h-10 bg-white dark:bg-[#262626] rounded flex items-center justify-center border border-gray-200 dark:border-gray-800">
                        <span className="material-icons-round text-[#7C3AED]">description</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#171717] dark:text-[#F5F5F5] text-sm font-medium">{msg.fileName}</span>
                        <span className="text-gray-400 text-[10px]">{msg.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#171717] dark:text-[#F5F5F5] text-sm px-1 mb-1">{msg.content}</p>
                  <span className="block text-right text-[10px] text-gray-400">{msg.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================= Footer ================= */}
        <footer className="p-4 bg-white dark:bg-[#262626] border-t border-gray-200 dark:border-gray-800 shrink-0 relative overflow-visible">
          <div className="max-w-4xl mx-auto flex items-end gap-3">
            
            {/* زر الجروبات (+) */}
            {isGroupChat && (
              <button onClick={() => setIsPostModalOpen(true)} className="mb-1 p-2 text-[#7C3AED] hover:bg-[#7C3AED]/10 rounded-full transition-colors shrink-0" title="Create Group Post">
                <span className="material-icons-round text-[26px]">add_circle</span>
              </button>
            )}

            {/* المرفقات */}
            <div className="relative shrink-0 mb-1" ref={attachMenuRef}>
              <button onClick={() => setShowAttachMenu(!showAttachMenu)} className={`p-2 rounded-full transition-colors ${showAttachMenu ? 'bg-gray-100 dark:bg-gray-800 text-[#7C3AED]' : 'text-gray-400 hover:text-[#7C3AED] hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <span className="material-icons-round rotate-45">attach_file</span>
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-[120%] left-0 w-48 bg-white dark:bg-[#262626] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 p-2 flex flex-col gap-1">
                  <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={() => setShowAttachMenu(false)} />
                  <input type="file" accept="*" ref={fileInputRef} className="hidden" onChange={() => setShowAttachMenu(false)} />
                  <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={() => setShowAttachMenu(false)} />
                  <button onClick={() => imageInputRef.current?.click()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#171717] transition-colors"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><span className="material-icons-round text-sm">image</span></div><span className="text-sm font-medium text-[#171717] dark:text-[#F5F5F5]">Photo / Video</span></button>
                  <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#171717] transition-colors"><div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400"><span className="material-icons-round text-sm">insert_drive_file</span></div><span className="text-sm font-medium text-[#171717] dark:text-[#F5F5F5]">Document</span></button>
                  <button onClick={() => cameraInputRef.current?.click()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#171717] transition-colors"><div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400"><span className="material-icons-round text-sm">photo_camera</span></div><span className="text-sm font-medium text-[#171717] dark:text-[#F5F5F5]">Camera</span></button>
                </div>
              )}
            </div>
            
            {/* مربع الكتابة / الريكورد */}
            <div className="flex-1 bg-[#FAFAFA] dark:bg-[#171717] rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center px-4 py-1.5 focus-within:border-[#7C3AED] transition-colors min-w-0 relative">
              {isRecording ? (
                <div className="flex-1 flex items-center gap-3 py-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-red-500 text-sm font-bold tracking-widest">{formatTime(recordingTime)}</span>
                   <span className="text-gray-400 text-xs ml-2 animate-pulse">Recording...</span>
                   <button onClick={() => { setIsRecording(false); setRecordingTime(0); }} className="ml-auto text-gray-400 hover:text-red-500 transition-colors" title="Cancel">
                     <span className="material-icons-round">delete_outline</span>
                   </button>
                </div>
              ) : (
                <>
                  <textarea 
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 resize-none text-[#171717] dark:text-[#F5F5F5] placeholder-gray-400 outline-none hide-scrollbar" 
                    placeholder="Write a message..." rows={1}
                  />
                  <div className="relative shrink-0 ml-2" ref={emojiMenuRef}>
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`p-1.5 rounded-full transition-colors ${showEmojiPicker ? 'text-[#7C3AED]' : 'text-gray-400 hover:text-[#7C3AED]'}`}>
                      <span className="material-icons-round">sentiment_satisfied_alt</span>
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-[130%] right-0 bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl p-3 w-64 grid grid-cols-6 gap-2 z-50">
                        {EMOJIS.map(emoji => (
                          <button key={emoji} onClick={() => { setNewMessage(prev => prev + emoji); setShowEmojiPicker(false); }} className="text-xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1">{emoji}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"></div>
                  <button onClick={() => { setIsRecording(true); setRecordingTime(0); }} className="p-1.5 text-gray-400 hover:text-[#7C3AED] transition-colors shrink-0">
                    <span className="material-icons-round">mic</span>
                  </button>
                </>
              )}
            </div>
            
            <button onClick={handleSend} className="bg-[#7C3AED] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#6D28D9] shadow-md shrink-0 mb-0.5 transition-colors">
              <span className="material-icons-round text-xl">send</span>
            </button>
          </div>
        </footer>
      </main>

      {/* ================= Side Panel ================= */}
      {showUserDetails && (
        <aside className="absolute right-0 top-0 h-full w-[340px] bg-white dark:bg-[#262626] border-l border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300 z-20 shadow-2xl shrink-0 animate-in slide-in-from-right duration-200">
          <div className="p-6 pb-4 flex flex-col items-center border-b border-gray-100 dark:border-gray-800 relative shrink-0">
            <button onClick={() => setShowUserDetails(false)} className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition-colors">
              <span className="material-icons-round">close</span>
            </button>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW6ItkwKUr4KlBQ51P-gCFRC6MxWH41ny06iQ2LtV9FoQRsSo-pKrce9CPwQrQiivOzrMecOrLybR1kH-xp40FVxZ9CrusaE6oJZq37YUIoDFgUGIrlyA0DeQWOCUXHyWkiWDT2Iag-9WcyTkL6__d64juO7NigKCiN0n8UoJoEqC-dd7-IUigCxsfMGAI7emL13gJeCGVk28QzFR6sRIEQbzgmWk77vTh06zwkU5KBZf8sA5y4L8czqcwPE1-fCMGC-X5VQ6kfTMV" className="w-24 h-24 rounded-full object-cover mb-3 shadow-sm" alt="User" />
            <h3 className="font-bold text-lg text-[#171717] dark:text-[#F5F5F5]">{chatName}</h3>
            <p className="text-xs text-gray-500 mt-1">Senior Developer</p>
          </div>
        </aside>
      )}

      {/* ================= Post Modal ================= */}
      {isGroupChat && (
        <CreatePostModal 
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          groupId="group-id" 
          groupName={chatName}
          onPostSuccess={() => { }}
        />
      )}
    </div>
  );
};