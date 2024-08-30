import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './unAuthorized.css'; 

const UnauthorizedAccess = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="unauthorized-access-container">
      <div className="unauthorized-access">
        <h2>Access Denied</h2>
        <p>You will be redirected to the home page shortly.</p>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
