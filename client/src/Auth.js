import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

const Auth = ({ onLogin, onLogout, children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    // and update the user state accordingly
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setUser({ token: userToken });
    }
  }, []);

  const handleLogin = (userData) => {
    // Perform login request to the backend
    // and update the user state accordingly
    // then save the user token in local storage
    onLogin(userData).then((response) => {
      localStorage.setItem("userToken", response.token);
      setUser(response);
    });
  };

  const handleLogout = () => {
    // Perform logout request to the backend
    // and remove the user token from local storage
    onLogout().then(() => {
      localStorage.removeItem("userToken");
      setUser(null);
    });
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {children}
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Auth;