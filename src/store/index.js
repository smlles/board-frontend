import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // js-cookie 임포트

// 초기 상태
const initialState = {
  isLoggedIn: !!Cookies.get('token'), // 쿠키에 토큰이 있으면 true, 없으면 false
  user: null,
  token: Cookies.get('token') || null, // 쿠키에서 토큰을 가져오거나 null
  isProfileModalOpen: false, // 프로필 모달 상태 추가
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
      Cookies.remove('token'); // 로그아웃 시 쿠키에서 토큰 제거
    },
    openProfileModal(state) {
      state.isProfileModalOpen = true;
    },
    closeProfileModal(state) {
      state.isProfileModalOpen = false;
    },
  },
});

// 액션 내보내기
export const { loginSuccess, logout, openProfileModal, closeProfileModal } = authSlice.actions;

// 스토어 생성 및 슬라이스 리듀서 등록
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;