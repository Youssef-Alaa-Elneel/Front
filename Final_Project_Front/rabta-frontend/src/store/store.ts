import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import jobsReducer from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    jobs: jobsReducer,
  },
});

// تعريف الأنواع لضمان دقة الـ Mapping في باقي المشروع
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;