import React, { useState } from "react";
import "./Navigation.css";
import CloseIcon from "../../assets/close.svg";

function Navigation({ onSignIn, isModalOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  return (
    <>
      <nav className="nav">
        <a className="logo" href="/">
          NewsExplorer
        </a>
        <ul className="nav__btns">
          <li>
            <a className="home__btn" href="/">
              Home
            </a>
          </li>
          <li>
            <button className="sign-in-btn" onClick={onSignIn}>
              Sign in
            </button>
          </li>
        </ul>
        {!isModalOpen && isMobile && (
          <button
            className="hamburgerMenu"
            aria-label="Open menu"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="8" width="32" height="4" rx="2" fill="white" />
              <rect y="20" width="32" height="4" rx="2" fill="white" />
            </svg>
          </button>
        )}
      </nav>
      <hr className="nav-line" />

      {menuOpen && !isModalOpen && (
        <div className="mobileMenu__overlay">
          <div className="mobileMenu__header">
            <a className="logo" href="/">
              NewsExplorer
            </a>
            <button
              className="close-menu"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              {/* Use imported SVG as close button */}
              <img
                src={CloseIcon}
                alt="Close"
                style={{ width: 24, height: 24 }}
              />
            </button>
          </div>
          <ul className="mobileMenu__list">
            <li>
              <a className="home__btn" href="/">
                Home
              </a>
            </li>
            <li>
              <button className="sign-in-btn" onClick={onSignIn}>
                Sign in
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;
