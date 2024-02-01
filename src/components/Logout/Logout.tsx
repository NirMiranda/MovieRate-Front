import React from 'react';
import axios from 'axios';
import './Logout.css'


function Logout() {
    const handleLogout = async () => {
        try {
        const token = localStorage.getItem('refreshToken');
        if (!token) {
            console.error('Unauthorized: No token found');
            return;
        }
      // Make a request to your backend logout endpoint
      await axios.post('http://localhost:3003/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Clear user data from local storage or wherever it is stored
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
        window.location.href = '/';
        } catch (error) {
        console.error(error);
        }
    };
  return (
    <button type='button' className="logoutBtn" style={{ marginRight: '0px' }} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;