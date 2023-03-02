import React from "react";

const Header = ({ loggedIn }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {loggedIn ? (
            <>
              <li>
                <a href="/logout">Logout</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Sign up</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;