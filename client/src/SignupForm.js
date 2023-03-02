import React, { useState } from "react";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username)
    console.log(password)
    console.log(event)
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match");
      return;
    }
    let user = [username, password]
    onSignup(user)
      
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setErrorMessage("");
      
      
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
      </label>
      <button type="submit">Sign up</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default SignupForm;