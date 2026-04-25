import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==========================================
// Toggle Component (Reusable)
// ==========================================
const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
  <div
    onClick={onToggle}
    className={`w-12 h-7 rounded-full relative transition-colors cursor-pointer shrink-0 ${
      enabled ? 'bg-[#7C3AED] dark:bg-[#8B5CF6]' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${enabled ? 'translate-x-5' : ''}`} />
  </div>
);

// ==========================================
// Component
// ==========================================
export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  // Privacy toggles - جاهزة للربط بالباك-إند
  const [showOnline, setShowOnline] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [allowDMs, setAllowDMs] = useState(false);

  return (
    <main className="flex-1 flex flex-col relative bg-[#FAFAFA] dark:bg-[#171717] overflow-y-auto custom-scrollbar transition-colors">
      <div className="max-w-2xl mx-auto w-full p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-white/70"
          >
            <span className="material-icons-round text-xl">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#F5F5F5]">Privacy</h1>
        </div>

        {/* Profile Visibility */}
        <div className="bg-white dark:bg-[#262626] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="p-4 border-b border-gray-50 dark:border-white/5 opacity-60 text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-white/60">
            Profile Visibility
          </div>

          <div className="flex items-center justify-between p-5 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Show Online Status</h4>
              <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Let connections see when you are active on Rabta.</p>
            </div>
            <ToggleSwitch enabled={showOnline} onToggle={() => setShowOnline(!showOnline)} />
          </div>

          <div className="flex items-center justify-between p-5 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Public ITI Profile</h4>
              <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Allow recruiters to see your ITI track and graduation year.</p>
            </div>
            <ToggleSwitch enabled={publicProfile} onToggle={() => setPublicProfile(!publicProfile)} />
          </div>

          <div className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-semibold text-[#171717] dark:text-[#F5F5F5]">Allow Direct Messages</h4>
              <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Receive messages from people outside your communities.</p>
            </div>
            <ToggleSwitch enabled={allowDMs} onToggle={() => setAllowDMs(!allowDMs)} />
          </div>
        </div>

      </div>
    </main>
  );
};
