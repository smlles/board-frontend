// src/app/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

// 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

// 액션 내보내기
export const { loginSuccess, logout } = authSlice.actions;

// 스토어 생성 및 슬라이스 리듀서 등록
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;