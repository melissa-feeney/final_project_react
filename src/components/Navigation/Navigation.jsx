import React from "react";
import "./Navigation.css";

function Navigation({ onSignIn }) {
  return (
    <>
      <nav className="nav">
        <a className="logo" href="/">
          NewsExplorer
        </a>
        <ul className="nav-btns">
          <li>
            <a className="home-btn" href="/">
              Home
            </a>
          </li>
          <li>
            <button className="sign-in-btn" onClick={onSignIn}>
              Sign in
            </button>
          </li>
        </ul>
      </nav>
      <hr className="nav-line" />
    </>
  );
}

export default Navigation;
