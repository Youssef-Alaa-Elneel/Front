import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "../components/ui/Input";

// 1. قوانين الفورم
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة الإيميل غير صحيحة"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login = () => {
  // 2. إعداد المكتبة
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // 3. دالة الإرسال
  const onSubmit = (data: LoginFormInputs) => {
    toast.success("تم التحقق بنجاح");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#171717] text-[#171717] dark:text-[#F5F5F5] transition-colors duration-300">
      <header className="w-full py-4 px-6 shadow-sm bg-[#FFFFFF] dark:bg-[#262626] transition-colors duration-300">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity text-[#7C3AED] dark:text-[#8B5CF6]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">Log In</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[#FFFFFF] dark:bg-[#262626] rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to continue
              </p>
            </div>

            {/* التعديل الأول: ربط الفورم بـ handleSubmit بتاع المكتبة */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* التعديل التاني: إضافة register و error لحقل الإيميل */}
              <Input
                label="Email or Phone"
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                {...register("email")}
                error={errors.email?.message}
              />

              {/* التعديل التالت: إضافة register و error لحقل الباسورد */}
              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
              />

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#7C3AED] dark:text-[#8B5CF6] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* التعديل الرابع: تعطيل الزرار وقت التحميل */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg font-bold text-white bg-[#7C3AED] dark:bg-[#8B5CF6] hover:opacity-90 shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Loading..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-[#7C3AED] dark:text-[#8B5CF6] hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
