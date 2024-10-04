import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import userReducer from './userSlice'; // Import userReducer

export const store = configureStore({
  reducer: {
    projects: projectsReducer, // Nơi lưu trữ state của dự án
    user: userReducer, // Nơi lưu trữ thông tin người dùng
  },
});

// Lấy kiểu RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
