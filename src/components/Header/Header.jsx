import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout, savedNewsPage }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;
  return (
    <header className={`header${savedNewsPage ? " header__saved-news" : ""}`}>
      <a href="#/" className="header__logo">
        NewsExplorer
      </a>
      <nav className="header__nav">
        <div className="nav__btns">
          <a href="#/" className="home__btn">
            Home
          </a>
          <a href="#/saved-news" className="header__saved-articles-btn">
            Saved articles
          </a>
          <button className="header__logout-btn" onClick={onLogout}>
            <span className="header__logout-username">{user.name}</span>
            <span className="header__logout-arrow">
              <img src="/logout.svg" alt="Logout arrow" />
            </span>
          </button>
        </div>
        {isMobile && (
          <button
            className="hamburgerMenu"
            aria-label="Go to Saved News"
            onClick={() => navigate("/saved-news")}
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
      <hr className="header__line" />
    </header>
  );
}

export default Header;
