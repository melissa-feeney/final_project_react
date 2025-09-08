import "./Header.css";

function Header({ user, onLogout, savedNewsPage }) {
  if (!user) return null;
  return (
    <header className={`header${savedNewsPage ? " header--saved-news" : ""}`}>
      <a href="#/" className="header-logo">
        NewsExplorer
      </a>
      <nav className="header-nav">
        <div className="nav-btns">
          <a href="#/" className="home-btn">
            Home
          </a>
          <a href="#/saved-news" className="saved-articles-btn">
            Saved articles
          </a>
          <button className="logout-btn" onClick={onLogout}>
            <span className="logout-username">{user.name}</span>
            <span className="logout-arrow">
              <img src="/logout.svg" alt="Logout arrow" />
            </span>
          </button>
        </div>
        {/* ...existing code... */}
      </nav>
      <hr className="header-line" />
      {/* Removed header-nav-line for App-level placement */}
    </header>
  );
}

export default Header;
