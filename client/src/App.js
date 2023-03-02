import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onSignup (user) {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error)); 
  }
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header loggedIn={isLoggedIn} />
        <main>
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>}  />
            <Route path="/signup" element={<SignupForm onSignup={onSignup} />}  />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;