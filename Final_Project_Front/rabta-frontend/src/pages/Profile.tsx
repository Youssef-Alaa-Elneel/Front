import React from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react'; // ضيفي useState هنا

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isAiOpen, setIsAiOpen] = useState(false); // للتحكم في فتح وقفل الـ Popup

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] font-sans antialiased overflow-hidden">
      
      {/* --- Sidebar (السايد بار الثابت) --- */}
      <aside className="w-18 sm:w-20 flex flex-col items-center py-6 bg-white dark:bg-[#1E1E1E] border-r border-[#1F1F1F]/5 dark:border-[#F5F5F5]/5 shrink-0 z-20 h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="mb-4">
            <div className="w-12 h-12 bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/20 rounded-2xl flex items-center justify-center text-[#7C3AED] dark:text-[#8B5CF6] shadow-sm">
              <span className="material-icons-round text-2xl">hub</span>
            </div>
          </div>
          <button className="nav-icon-btn" title="Chats"><span className="material-icons-round text-2xl">chat_bubble_outline</span></button>
          <button className="nav-icon-btn" title="Community"><span className="material-icons-round text-2xl">groups</span></button>
          <button className="nav-icon-btn" title="Saved"><span className="material-icons-round text-2xl">bookmark_border</span></button>
          <button className="nav-icon-btn" title="Jobs"><span className="material-icons-round text-2xl">work_outline</span></button>
          <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] hover:bg-[#7C3AED]/10 dark:hover:bg-[#8B5CF6]/10 rounded-2xl transition-all duration-300" title="Calls">
            <span className="material-icons-round">call</span>
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center gap-5 w-full">
          <button className="nav-icon-btn" title="Settings"><span className="material-icons-round text-2xl">settings</span></button>
          <button onClick={() => navigate('/profile')} className="w-11 h-11 flex items-center justify-center bg-[#7C3AED] dark:bg-[#8B5CF6] text-white rounded-full shadow-md border-2 border-white dark:border-[#1E1E1E] transition-transform hover:scale-105" title="My Profile">
            <span className="text-sm font-bold tracking-wider">{user?.fullName?.substring(0, 2).toUpperCase() || 'YO'}</span>
          </button>
        </div>
      </aside>

      {/* --- المحتوى الرئيسي (Scrollbar Classic) --- */}
      <main className="flex-1 overflow-y-auto bg-[#FAFAFA] dark:bg-[#171717] p-4 md:p-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* العمود الأيسر (Left Column) */}
          <aside className="w-full lg:w-[35%] space-y-6">
            <div className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-8 text-center border border-gray-100 dark:border-white/5">
              <div className="w-32 h-32 bg-[#7C3AED] rounded-full flex items-center justify-center text-white text-4xl font-black shadow-lg mx-auto mb-6">
                {user?.fullName?.[0] || 'A'}
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.fullName || 'User Name'}</h2>
              <p className="text-[#7C3AED] dark:text-[#8B5CF6] font-medium mb-6">{user?.jobTitle || 'Front-End Engineer'}</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/edit-profile')}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-icons-round text-sm">edit</span>
                  Edit Profile
                </button>
                
                {/* ✅ زرار Connect Me المضاف */}
                <button 
                  className="w-full border-2 border-[#7C3AED] text-[#7C3AED] dark:text-[#8B5CF6] dark:border-[#8B5CF6] hover:bg-[#7C3AED]/5 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-icons-round text-sm">person_add</span>
                  Connect Me
                </button>
              </div>
            </div>

            {/* كارت المهارات */}
            <div className="bg-white dark:bg-[#262626] rounded-xl shadow-md p-8 border border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-bold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-[#F3E8FF] dark:bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#A78BFA] rounded-lg text-xs font-bold">
                    {skill}
                  </span>
                )) || <p className="text-xs opacity-50 italic">No skills listed</p>}
              </div>
            </div>
          </aside>

          {/* العمود الأيمن (Right Column) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8">
            
            {/* About Me Section */}
            <section className="bg-[#FFFFFF] dark:bg-[#262626] rounded-xl shadow-md p-8 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-3">About Me</h3>
              <div className="w-12 h-1 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full mb-6"></div>
              <p className="leading-relaxed mb-4 text-[#171717] dark:text-[#F5F5F5]">
                {user?.bio || "I am a dedicated Front-End Engineer focused on clean code and user-centric design..."}
              </p>
            </section>

            {/* Featured Projects Section */}
            <section>
              <h3 className="text-2xl font-bold mb-3 px-2">Featured Projects</h3>
              <div className="w-12 h-1 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full mb-6 mx-2"></div>
              
              <div className="grid grid-cols-1 gap-6">
                <article className="bg-[#FFFFFF] dark:bg-[#262626] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="grow">
                    <h4 className="text-xl font-bold mb-2">TechGrad Network Hub</h4>
                    <p className="text-sm opacity-80 mb-4 leading-relaxed">
                      A real-time communication platform for technology graduates.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-[#7C3AED] text-white px-5 py-2 rounded-lg text-sm font-medium">View Project</button>
                      <button className="border border-[#7C3AED] text-[#7C3AED] px-5 py-2 rounded-lg text-sm font-medium">GitHub</button>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </div>

        </div>
      </main>

      <style>{`
        .nav-icon-btn { @apply w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] dark:hover:text-[#8B5CF6] hover:bg-[#7C3AED]/10 dark:hover:bg-[#8B5CF6]/10 rounded-2xl transition-all duration-300; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      {/* --- AI Floating Button & Popup --- */}
<div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
  {/* الـ Popup بيظهر بس لما isAiOpen تكون true */}
  {isAiOpen && (
    <div className="w-80 bg-white dark:bg-[#262626] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#7C3AED] dark:bg-[#8B5CF6] p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="font-bold text-sm">Rabta AI</span>
        </div>
        <button onClick={() => setIsAiOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
          <span className="material-icons-round text-sm">close</span>
        </button>
      </div>
      
      <div className="h-48 bg-[#FAFAFA] dark:bg-[#171717] p-4 text-sm text-gray-500 dark:text-[#F5F5F5]/50 italic overflow-y-auto">
        How can I help you today? I can help you write a professional bio or suggest skills!
      </div>

      <div className="p-4 bg-white dark:bg-[#262626] border-t border-gray-100 dark:border-white/10">
        <input 
          type="text" 
          placeholder="Ask AI anything..." 
          className="w-full text-sm p-2.5 rounded-xl bg-gray-50 dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all"
        />
      </div>
    </div>
  )}

  {/* زرار البرق اللي بيفتح الـ AI */}
  <button 
    onClick={() => setIsAiOpen(!isAiOpen)} 
    className="w-12 h-12 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform active:scale-95"
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </button>
</div>
    </div>
  );
};

export default Profile;