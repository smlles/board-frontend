import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
// 공통 설정이 적용된 axios 인스턴스
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 인증 정보(쿠키 등)를 요청에 포함
});

// 요청마다 토큰 자동 추가 (옵션)
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('boardApi: 토큰이 Authorization 헤더에 추가됨', token);
  } else {
    console.log('boardApi: 쿠키에 토큰 없음');
  }
  return config;
});

// 게시판 관련 API 함수 모음
export const boardApi = {
  // 글 작성
  createPost: (data) => axiosInstance.post('/api/board', data),

  // 글 목록
  getPosts: () => axiosInstance.get('/api/board/boards'),

  // 단일 글 조회
  getPostById: (id) => axiosInstance.get(`/api/board/${id}`),

  // 글 수정
  updatePost: (data) => axiosInstance.put('/api/board', data),

  // 글 삭제
  deletePost: (id) => axiosInstance.delete(`/api/board/${id}`),



};
