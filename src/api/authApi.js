// src/api/authApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/users',        // CRA proxy 사용 시 http://localhost:5000으로 포워딩
  headers: { 'Content-Type': 'application/json' }
});

export const authApi = {
  login:     (data) => api.post('/login',    data),
  register:  (data) => api.post('/register', data)
};