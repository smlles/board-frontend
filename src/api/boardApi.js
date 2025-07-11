import axios from 'axios';

// 공통 설정이 적용된 axios 인스턴스
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청마다 토큰 자동 추가 (옵션)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 게시판 관련 API 함수 모음
export const boardApi = {
  // 글 작성
  createPost: (data) => axiosInstance.post('/board', data),

  // 글 목록
  getPosts: () => axiosInstance.get('/board'),

  // 단일 글 조회
  getPostById: (id) => axiosInstance.get(`/board/${id}`),

  // 글 수정
  updatePost: (data) => axiosInstance.put('/board', data),

  // 글 삭제
  deletePost: (id) => axiosInstance.delete(`/board/${id}`),
};
