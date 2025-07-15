import axios from 'axios';
import Cookies from 'js-cookie'; // js-cookie 임포트

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
 baseURL: API_BASE_URL + '/api/users',  // auth.api는 /api/users 붙임
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // 인증 정보(쿠키 등)를 요청에 포함
});

// 요청 인터셉터: 모든 요청에 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // localStorage 대신 Cookies.get 사용
    console.log('authApi: 쿠키에서 가져온 토큰 값:', token, '타입:', typeof token);
    if (token && token !== 'undefined' && token !== 'null') { // 유효한 토큰인지 추가 확인
      config.headers.Authorization = `Bearer ${token}`;
      console.log('authApi: Authorization 헤더에 토큰 추가됨', token);
    } else {
      console.log('authApi: 유효한 토큰이 없거나 ',undefined,'/',null,' 문자열임 (쿠키)');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login:     (data) => api.post('/login',    data),
  register:  (data) => api.post('/register', data),
  getProfile: () => api.get('/me'), // 프로필 조회 API
  updateProfile: (data) => api.put('/me', data) // 프로필 업데이트 API
};