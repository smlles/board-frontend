import React, { useState, useEffect } from 'react';
// import Input from '../../common/Input'; // Input 컴포넌트 대신 일반 input 사용
import Button from '../../common/Button/Button';

import { authApi } from '../../../api/authApi'; // authApi 임포트

const ProfileEditForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authApi.getProfile();
        console.log('Profile data fetched:', response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching profile:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { username };
      if (password) {
        updateData.password = password;
      }
      await authApi.updateProfile(updateData);
      alert('프로필이 성공적으로 업데이트되었습니다!');
      onClose(); // 업데이트 성공 시 모달 닫기
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await authApi.deleteAccount();
        alert('회원 탈퇴가 완료되었습니다.');
        onClose(); // 모달 닫기
      } catch (error) {
        console.error('회원 탈퇴 실패:', error);
        alert('회원 탈퇴에 실패했습니다.');
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly // 이메일은 수정 불가하도록 설정
        />
      </div>
      <div>
        <label htmlFor="password">새 비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="변경하려면 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="username">사용자 이름:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <Button type="submit" className="blue-btn">저장</Button>
        <Button type="button" onClick={onClose} className="grey-btn">취소</Button>
        <Button type="button" onClick={handleDelete} className="red-btn">회원 탈퇴</Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
