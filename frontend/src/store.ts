import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import userReducer from './userSlice'; // Import userReducer
import chatReducer from './chatSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer, // Nơi lưu trữ state của dự án
    user: userReducer, 
    chat: chatReducer,
  },
});

// Lấy kiểu RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
