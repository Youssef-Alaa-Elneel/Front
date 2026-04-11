import axiosInstance from './axiosInstance';

// ==========================================
// 1. واجهات البيانات (Types / Interfaces)
// ==========================================

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterData {
  fullName: string;      // عدلناها عشان تطابق الباك-إند
  email: string;
  phoneNumber: string;   // عدلناها عشان تطابق الباك-إند
  password: string;
}

// شكل البيانات اللي بترجع من الباك-إند بعد النجاح
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    phone?: string;
    // تقدر تضيف أي بيانات تانية الباك-إند بيبعتها هنا (زي صورة البروفايل مثلاً)
  };
  message?: string;
}

// ==========================================
// 2. دوال الاتصال بالـ API (API Functions)
// ==========================================

/**
 * دالة تسجيل الدخول
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // بنبعت POST للـ /auth/login
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

/**
 * دالة إنشاء حساب جديد
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  // بنبعت POST للـ /auth/register
  const response = await axiosInstance.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

/**
 * دالة تسجيل الخروج (إضافة مفيدة ليك)
 * بتمسح التوكن وبترجع المستخدم لصفحة اللوجن
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};