import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ==========================================
// Interfaces
// ==========================================
interface GroupMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  time: string;
  isMine: boolean;
  isCode?: boolean;
  codeContent?: string;
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'Owner' | 'Admin' | 'Member';
  isOnline: boolean;
}

// ==========================================
// Component
// ==========================================
const GroupDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const [messages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [members] = useState<GroupMember[]>([]);
  const [sidebarTab, setSidebarTab] = useState<'Members' | 'Media' | 'Links' | 'Jobs'>('Members');

  // TODO (Backend): جلب بيانات الجروب والرسائل والأعضاء
  // useEffect(() => {
  //   axios.get(`/api/groups/${id}`).then(...)
  //   axios.get(`/api/groups/${id}/messages`).then(...)
  //   axios.get(`/api/groups/${id}/members`).then(...)
  // }, [id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // TODO (Backend): إرسال الرسالة عبر Socket أو API
    // socket.emit('group-message', { groupId: id, content: newMessage });
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full h-full bg-[#FAFAFA] dark:bg-[#171717] overflow-hidden">
      
      {/* 1. Group List Sidebar */}
      <aside className="w-80 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#262626] shrink-0 transition-colors duration-300">
        {/* Search */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="relative mb-4">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input
              type="text"
              placeholder="Search tech hubs..."
              className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA] dark:bg-[#171717] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-[#7C3AED] text-sm placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all text-[#171717] dark:text-[#F5F5F5]"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <button className="px-3 py-1.5 bg-[#7C3AED] text-white text-[11px] font-semibold rounded-full shrink-0">All</button>
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-[11px] font-semibold rounded-full shrink-0 transition-colors">Front-End</button>
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-[11px] font-semibold rounded-full shrink-0 transition-colors">UI/UX</button>
            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-[11px] font-semibold rounded-full shrink-0 transition-colors">Back-End</button>
          </div>
        </div>

        {/* Group List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-2 py-4">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#171717] rounded-full flex items-center justify-center mb-4">
                <span className="material-icons-round text-3xl text-gray-300 dark:text-gray-600">groups</span>
              </div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">No group chats yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Join a community to start chatting.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Chat Area */}
      <main className="flex-1 flex flex-col bg-[#FAFAFA] dark:bg-[#171717] transition-colors duration-300 min-h-0 min-w-0">
        {/* Chat Header */}
        <header 
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('button')) return;
            setShowSidebar(!showSidebar);
          }}
          className="h-16 px-6 bg-white/80 dark:bg-[#262626]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between z-10 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 shrink-0"
        >
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate('/groups')} className="sm:hidden mr-1 text-gray-400 hover:text-[#7C3AED]">
              <span className="material-icons-round">arrow_back</span>
            </button>
            <div className="w-10 h-10 rounded-lg bg-[#7C3AED] dark:bg-[#8B5CF6] flex items-center justify-center text-white shadow-sm shrink-0">
              <span className="material-icons-round">terminal</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm leading-tight truncate text-[#171717] dark:text-[#F5F5F5]">Group Chat</h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">0 members • 0 online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500 shrink-0">
            {/* Video Call Button Group */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
              <button className="px-2.5 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors flex items-center justify-center" title="Start Video Call">
                <span className="material-icons-round text-[20px]">videocam</span>
              </button>
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
              <button className="px-1 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors flex items-center justify-center" title="Call Options">
                <span className="material-icons-round text-[18px]">arrow_drop_down</span>
              </button>
            </div>
            <button className="hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors"><span className="material-icons-round">search</span></button>
            <button className="hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors"><span className="material-icons-round">notifications_none</span></button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
            <button className="hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors"><span className="material-icons-round">more_vert</span></button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mb-4">
                <span className="material-icons-round text-4xl text-[#7C3AED] dark:text-[#8B5CF6]">forum</span>
              </div>
              <p className="text-lg font-bold text-gray-400 dark:text-gray-500 mb-1">No messages yet</p>
              <p className="text-sm text-gray-300 dark:text-gray-600">Be the first to start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMine ? 'flex-row-reverse' : ''} gap-3 max-w-2xl ${msg.isMine ? 'ml-auto' : ''}`}>
                {!msg.isMine && (
                  <img className="w-8 h-8 rounded-lg object-cover self-end shadow-sm" src={msg.senderAvatar} alt={msg.senderName} />
                )}
                <div className={`flex flex-col gap-1 ${msg.isMine ? 'items-end' : ''}`}>
                  <span className={`text-[11px] font-semibold text-[#7C3AED] dark:text-[#8B5CF6] ${msg.isMine ? 'mr-1' : 'ml-1'}`}>
                    {msg.isMine ? 'You' : `@${msg.senderName}`}
                  </span>
                  <div className={`p-3 rounded-xl shadow-sm ${
                    msg.isMine 
                      ? 'bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-br-none shadow-md' 
                      : 'bg-white dark:bg-[#262626] rounded-bl-none border border-gray-200 dark:border-gray-800'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    {msg.isCode && msg.codeContent && (
                      <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-[13px] text-gray-100 overflow-x-auto border border-gray-800 custom-scrollbar mt-2">
                        <pre><code>{msg.codeContent}</code></pre>
                      </div>
                    )}
                    <div className={`flex items-center gap-1 mt-1 ${msg.isMine ? 'justify-end' : 'justify-end'}`}>
                      <span className={`text-[10px] ${msg.isMine ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>{msg.time}</span>
                      {msg.isMine && <span className="material-icons-round text-[14px] text-white/80">done_all</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input Footer */}
        <footer className="p-4 bg-white dark:bg-[#262626] border-t border-gray-200 dark:border-gray-800 transition-colors shrink-0">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-[#FAFAFA] dark:bg-[#171717] border border-gray-200 dark:border-gray-700 p-2 rounded-xl focus-within:border-[#7C3AED] dark:focus-within:border-[#8B5CF6] transition-colors">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] rounded-lg transition-colors shrink-0">
              <span className="material-icons-round">add_circle_outline</span>
            </button>
            <div className="flex-1 min-w-0 px-2">
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder-gray-400 outline-none text-[#171717] dark:text-[#F5F5F5]"
                placeholder="Type a message..."
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] rounded-lg transition-colors shrink-0">
              <span className="material-icons-round">sentiment_satisfied_alt</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] rounded-lg transition-colors shrink-0">
              <span className="material-icons-round">mic</span>
            </button>
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-lg flex items-center justify-center shadow-md hover:opacity-90 transition-all active:scale-95 shrink-0"
            >
              <span className="material-icons-round">send</span>
            </button>
          </div>
        </footer>
      </main>

      {/* 3. Group Details Sidebar (toggleable) */}
      {showSidebar && (
        <aside className="w-[340px] bg-white dark:bg-[#262626] border-l border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300 relative z-10 min-h-0 shrink-0">
          {/* Group Profile */}
          <div className="p-6 pb-4 flex flex-col items-center border-b border-gray-100 dark:border-gray-800 relative shrink-0">
            <button onClick={() => setShowSidebar(false)} className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition-colors">
              <span className="material-icons-round">close</span>
            </button>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] transition-colors">
              <span className="material-icons-round">edit</span>
            </button>
            <div className="w-24 h-24 bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 rounded-full flex items-center justify-center mb-3 text-[#7C3AED] dark:text-[#8B5CF6] shadow-sm relative">
              <span className="material-icons-round text-5xl">terminal</span>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-[#262626] rounded-full"></div>
            </div>
            <h3 className="font-bold text-lg text-center text-[#171717] dark:text-[#F5F5F5]">Group Chat</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">0 members, 0 online</p>
          </div>

          {/* Invite Link & Notifications */}
          <div className="px-2 py-2 border-b border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#7C3AED] dark:text-[#8B5CF6]">rabta.app/join/{id}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Invite Link</span>
              </div>
              <span className="material-icons-round text-gray-400">qr_code_2</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Notifications</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Enabled</span>
              </div>
              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#7C3AED] dark:bg-[#8B5CF6] transition-colors">
                <span className="inline-block h-4 w-4 translate-x-4 rounded-full bg-white transition-transform"></span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto hide-scrollbar px-2 shrink-0">
            {(['Members', 'Media', 'Links', 'Jobs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                  sidebarTab === tab
                    ? 'text-[#7C3AED] dark:text-[#8B5CF6] border-b-2 border-[#7C3AED] dark:border-[#8B5CF6]'
                    : 'text-gray-500 hover:text-[#171717] dark:hover:text-[#F5F5F5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Members List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {/* Add Member */}
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-colors text-[#7C3AED] dark:text-[#8B5CF6] mb-2">
              <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 flex items-center justify-center">
                <span className="material-icons-round text-xl">person_add</span>
              </div>
              <span className="text-sm font-semibold">Add Member</span>
            </div>

            {members.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-sm text-gray-400 dark:text-gray-500">No members loaded</p>
              </div>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-colors">
                  <div className={`relative shrink-0 ${!member.isOnline ? 'opacity-60' : ''}`}>
                    <img className="w-10 h-10 rounded-full object-cover" src={member.avatar} alt={member.name} />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${member.isOnline ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'} border-2 border-white dark:border-[#262626] rounded-full`}></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate text-[#171717] dark:text-[#F5F5F5]">{member.name}</p>
                    <p className={`text-[11px] truncate ${member.role === 'Owner' ? 'text-[#7C3AED] dark:text-[#8B5CF6] font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* More Details */}
          <button
            onClick={() => navigate(`/groups/${id}`)}
            className="w-full py-3 mt-auto border-t border-gray-100 dark:border-gray-800 text-[13px] font-semibold text-gray-500 dark:text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all flex justify-center items-center gap-1.5 shrink-0"
          >
            More Details
            <span className="material-icons-round text-[16px]">chevron_right</span>
          </button>
        </aside>
      )}
    </div>
  );
};

export default GroupDetails;