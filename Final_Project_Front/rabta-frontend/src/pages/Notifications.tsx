import { useState } from 'react'; // شلنا كلمة React عشان الـ Warning
import { useNavigate } from 'react-router-dom';

// 1. تعريف الأنواع (Interfaces) عشان نخلص من خطأ الـ any
interface NotificationItemProps {
  title: string;
  desc: string;
  active: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    chatMessages: true,
    communityMentions: true,
    aiJobMatches: true,
    inAppSounds: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[#FAFAFA] dark:bg-[#171717] overflow-y-auto custom-scrollbar transition-all duration-300">
      <div className="max-w-2xl mx-auto w-full p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-white/70"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#F5F5F5]">Notifications</h1>
        </div>

        {/* Section 1: Push Alerts */}
        <div className="bg-white dark:bg-[#262626] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden mb-6 shadow-sm">
          <div className="p-4 border-b border-gray-50 dark:border-white/5 opacity-60 text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-white/60">
            Push Alerts
          </div>
          
          <NotificationItem 
            title="Chat Messages" 
            desc="Get notified for new personal messages." 
            active={settings.chatMessages} 
            onToggle={() => toggleSetting('chatMessages')} 
          />

          <NotificationItem 
            title="Community Mentions" 
            desc="Notify me when someone tags me in a group." 
            active={settings.communityMentions} 
            onToggle={() => toggleSetting('communityMentions')} 
          />

          {/* AI Job Matches */}
          <div className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-semibold text-[#7C3AED] dark:text-[#8B5CF6] flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                AI Job Matches
              </h4>
              <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
                Let Rabta AI notify you about jobs matching your ITI track.
              </p>
            </div>
            <ToggleButton active={settings.aiJobMatches} onClick={() => toggleSetting('aiJobMatches')} />
          </div>
        </div>

        {/* Section 2: App Settings */}
        <div className="bg-white dark:bg-[#262626] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <NotificationItem 
            title="In-App Sounds" 
            desc="Play sounds for incoming messages." 
            active={settings.inAppSounds} 
            onToggle={() => toggleSetting('inAppSounds')} 
            isLast={true}
          />
        </div>

      </div>
    </main>
  );
};

// --- Sub-Components ---

const NotificationItem = ({ title, desc, active, onToggle, isLast = false }: NotificationItemProps) => (
  <div className={`flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors ${!isLast ? 'border-b border-gray-50 dark:border-white/5' : ''}`}>
    <div className="flex-1 pr-4">
      <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">{title}</h4>
      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">{desc}</p>
    </div>
    <ToggleButton active={active} onClick={onToggle} />
  </div>
);

const ToggleButton = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`w-12 h-7 rounded-full relative transition-all duration-300 cursor-pointer shrink-0 
      ${active ? 'bg-[#7C3AED] dark:bg-[#8B5CF6]' : 'bg-gray-300 dark:bg-gray-600'}`}
  >
    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm
      ${active ? 'translate-x-6' : 'translate-x-1'}`} 
    />
  </div>
);

export default Notifications;