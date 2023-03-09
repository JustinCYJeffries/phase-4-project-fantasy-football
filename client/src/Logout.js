import React from 'react';
import {  useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
    const navigate = useNavigate();

  const handleClick = () => {
    // Call the onLogout callback function passed as a prop
   
      onLogout();
   
  };
  const handleStay = () => {
    // Call the onLogout callback function passed as a prop
   
    navigate("/");
   
  };

  return (<div>
    Are you sure you want to log out?
    <button onClick={handleClick}>Logout</button>
    <button onClick={handleStay}>Cancel</button>
    </div>
  );
}

export default Logout;