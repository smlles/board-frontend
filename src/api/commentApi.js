import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// 공통 axios 인스턴스
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청마다 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('commentApi: 토큰이 Authorization 헤더에 추가됨', token);
  } else {
    console.log('commentApi: 쿠키에 토큰 없음');
  }
  return config;
});

// 댓글 관련 API 함수 모음
export const commentApi = {
  // 특정 게시글 댓글 목록 조회
  getCommentsByBoardId: (boardId) => axiosInstance.get(`/api/comment/board/${boardId}`),

  // 댓글 작성
  createComment: (data) => axiosInstance.post('/api/comment', data),

  // 댓글 수정
  updateComment: (data) => axiosInstance.put('/api/comment', data),

  // 댓글 삭제
  deleteComment: (id) => axiosInstance.delete(`/api/comment/${id}`),
};