import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // التوجيه لصفحة الـ /chats بعد 3.5 ثانية
    // (الحارس بتاع ProtectedRoute هيتولى الباقي لو مش مسجل دخول)
    const timer = setTimeout(() => {
      navigate("/chats");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] dark:bg-[#171717] transition-colors duration-500 relative font-sans">
      {/* الدوائر الملونة في الخلفية (نفس الـ HTML) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/15 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/10 dark:bg-[#8B5CF6]/15 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="flex flex-col items-center z-10 relative">
        {/* اللوجو مع الـ Gradient والأنيميشن */}
        <div className="relative animate-scale-in mb-8">
          <div className="absolute inset-0 bg-[#7C3AED] dark:bg-[#8B5CF6] blur-2xl opacity-40 rounded-[32px]"></div>
          <div className="relative w-28 h-28 bg-gradient-to-tr from-[#7C3AED] to-[#9F67FF] dark:from-[#8B5CF6] dark:to-[#A78BFA] rounded-[32px] flex items-center justify-center text-white shadow-2xl animate-float border border-white/20">
            <span className="material-icons-round text-[60px]">hub</span>
          </div>
        </div>

        {/* النصوص */}
        <h1 className="text-5xl font-black text-[#171717] dark:text-[#F5F5F5] tracking-tight mb-3 animate-fade-in-up opacity-0 [animation-delay:0.2s]">
          Rabta
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 animate-fade-in-up opacity-0 mb-14 [animation-delay:0.4s]">
          Tech Community Hub
        </p>

        {/* شريط التحميل */}
        <div className="animate-fade-in-up opacity-0 flex flex-col items-center w-full [animation-delay:0.6s]">
          <div className="w-48 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 w-1/2 bg-[#7C3AED] dark:bg-[#8B5CF6] rounded-full animate-loading"></div>
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 font-medium animate-pulse">
            Syncing with ITI network...
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 text-center animate-fade-in-up opacity-0 z-10 [animation-delay:0.8s]">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};
