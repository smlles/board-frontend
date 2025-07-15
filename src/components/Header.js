import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, openProfileModal } from '../store';
import '../styles/Header.css';
import '../styles/auth.css';

const Header = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="logo">
                <a href={isLoggedIn ? "/post" : "/login"}>이름 정하기가 너무 어렵다.</a>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href={isLoggedIn ? "/post" : "/login"}>Home</a></li>
                    <li><a href="/post">Board</a></li>
                </ul>
            </nav>
            <div className="user-menu">
                {isLoggedIn ? (
                    <>
                        <button onClick={() => dispatch(openProfileModal())} className="header-button">프로필 설정</button>
                        <button onClick={handleLogout} className="red-btn">로그아웃</button>
                    </>
                ) : (
                    <a href="/login" className="header-link">로그인</a>
                )}
            </div>
        </header>
    );
};

export default Header;
