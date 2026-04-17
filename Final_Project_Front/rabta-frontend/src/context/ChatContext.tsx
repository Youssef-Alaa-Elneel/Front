// src/context/ChatContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// 1. تعريف نوع البيانات اللي الـ Context هيشيلها
interface ChatContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// 2. إنشاء الـ Context بقيم ابتدائية
const ChatContext = createContext<ChatContextType>({
  socket: null,
  isConnected: false,
});

// 3. Custom Hook عشان نستخدم الـ Socket بسهولة في أي صفحة
export const useChat = () => {
  return useContext(ChatContext);
};

// 4. الـ Provider اللي هيغلف المشروع
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // TODO (Backend Team): تغيير اللينك ده للينك سيرفر الباك-إند الحقيقي لما يجهز
    const socketInstance = io("http://localhost:5000", {
      autoConnect: true, // يتصل أوتوماتيك
      // ممكن نضيف هنا التوكن بعدين لما نربط الـ Auth
      // auth: { token: "user_token_here" } 
    });

    setSocket(socketInstance);

    // مراقبة حالة الاتصال
    socketInstance.on("connect", () => {
      console.log("🟢 Socket Connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
      setIsConnected(false);
    });

    // التنظيف لما اليوزر يقفل الموقع
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={{ socket, isConnected }}>
      {children}
    </ChatContext.Provider>
  );
};