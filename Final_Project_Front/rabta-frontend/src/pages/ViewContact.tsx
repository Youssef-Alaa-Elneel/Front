import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ViewContact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar bg-[#F8F7FC] dark:bg-[#121212] transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#8B5CF6]/10 to-transparent z-0 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-10 z-10">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[#8B5CF6] font-bold transition-all w-fit hover:-translate-x-1 mb-8 focus:outline-none">
          <span className="material-icons-round text-xl">arrow_back</span>
          Back to Chat
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <article className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-[#8B5CF6]/10 transition-all duration-500 overflow-hidden relative">
              <div className="h-32 w-full bg-gradient-to-r from-[#8B5CF6]/40 to-blue-500/40 relative">
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </div>
              </div>

              <div className="px-8 pb-8 sm:px-10 sm:pb-10 relative">
                <div className="absolute -top-16 left-8 sm:left-10 p-1.5 bg-white dark:bg-[#1E1E1E] rounded-full shadow-sm">
                  <img src="https://ui-avatars.com/api/?name=Mai+Ahmed&background=8B5CF6&color=fff&size=256" alt="Contact Avatar" className="w-28 h-28 rounded-full object-cover" />
                </div>

                <div className="mt-16 mb-8">
                  <h1 className="text-3xl font-bold tracking-tight mb-1 dark:text-[#F5F5F5]">Mai Ahmed</h1>
                  <p className="text-[#8B5CF6] font-bold text-lg mb-3">UI/UX Designer</p>
                  <p className="text-sm opacity-70 font-light leading-relaxed max-w-lg dark:text-[#F5F5F5]">
                    Creative designer focusing on user-centered digital experiences. Currently working on freelance projects and exploring modern UI trends.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                  <button onClick={() => navigate('/chats')} className="flex-1 min-w-[120px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                    <span className="material-icons-round text-xl">chat</span> Message
                  </button>
                  <button className="w-14 h-14 bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] rounded-2xl flex items-center justify-center transition-colors">
                    <span className="material-icons-round text-xl">call</span>
                  </button>
                  <button className="w-14 h-14 bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#8B5CF6] rounded-2xl flex items-center justify-center transition-colors">
                    <span className="material-icons-round text-xl">videocam</span>
                  </button>
                </div>

                {/* Contact Info (Email, Location, etc) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:text-[#F5F5F5]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] shrink-0">
                      <span className="material-icons-round text-[20px]">email</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold opacity-60 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm font-bold">mai.ahmed@example.com</p>
                    </div>
                  </div>
                  {/* ... Rest of info ... */}
                </div>
              </div>
            </article>
          </div>

          <aside className="w-full flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-[#8B5CF6]/10 p-6 transition-all duration-500 sticky top-6">
              <h3 className="text-lg font-bold tracking-tight mb-6 dark:text-[#F5F5F5]">Shared Content</h3>
              
              {/* Media Preview */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80" className="aspect-square rounded-xl object-cover cursor-pointer" alt="media" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80" className="aspect-square rounded-xl object-cover cursor-pointer" alt="media" />
                <div onClick={() => navigate('/shared-content')} className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative">
                  <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&q=80" className="w-full h-full object-cover opacity-50" alt="media" />
                  <span className="absolute font-bold text-white text-sm">+12</span>
                </div>
              </div>

              {/* 💡 التوجيه لصفحة الـ View All Content */}
              <button onClick={() => navigate('/shared-content')} className="w-full mt-6 text-sm font-bold text-[#8B5CF6] hover:underline transition-all">
                View All Content
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};