<div className="top-background"></div>;
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import { fetchNews } from "../../utils/newsApi";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardList from "../NewsCardList";
import "./App.css";
import SavedNews from "../SavedNews/SavedNews";
import ErrorBoundary from "../ErrorBoundary";

// function SavedNews({ savedArticles, user }) {
//   return (
//     <div>
//       <h2 className="saved-card-list-title">Saved Articles</h2>
//       <div className="saved-card-list">
//         {savedArticles.length === 0 ? (
//           <p>No saved articles yet.</p>
//         ) : (
//           savedArticles.map((article, idx) => (
//             <NewsCard key={idx} article={article} user={user} marked={true} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

function App() {
  const [modalType, setModalType] = useState(null); // 'login' or 'register'
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [user, setUser] = useState(null); // { name: "username" } or null
  const [registeredName, setRegisteredName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Registration handler
  const handleRegisterSubmit = ({ name, email, password }) => {
    setModalType(null);
    setShowSuccessModal(true);
    if (name) {
      setRegisteredName(name);
    }
  };
  const handleSuccessSignIn = () => {
    setShowSuccessModal(false);
    setModalType("login");
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  // Login handler
  const handleLoginSubmit = ({ email, password }) => {
    if (registeredName) {
      setUser({ name: registeredName });
    } else {
      setUser({ name: "Elise" }); // fallback if no registered name
    }
    setModalType(null);
  };
  const apiKey = "5d4859e0d48b433f92e3096920431ae6";

  const handleClose = () => setModalType(null);
  const handleOpenLogin = () => {
    console.log("Sign in button clicked");
    setModalType("login");
  };
  const handleOpenRegister = () => setModalType("register");

  // New search handler for SearchForm
  const handleSearch = async (term) => {
    setError("");
    setLoading(true);
    setSearched(true);
    setArticles([]);
    setVisibleCount(3);
    setSearchTerm(term);

    if (!term.trim()) {
      setError("Please enter a keyword");
      setLoading(false);
      return;
    }
    try {
      const data = await fetchNews(term, apiKey);
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    }
    setLoading(false);
  };

  // Save article handler
  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      // Prevent duplicates by url
      if (prev.some((a) => a.url === article.url)) return prev;
      // Attach the current searchTerm as the keyword
      return [...prev, { ...article, keyword: searchTerm }];
    });
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
  };

  // Get current route for header styling
  function HeaderWithRoute(props) {
    const location = useLocation();
    const isSavedNews = location.pathname === "/saved-news";
    return (
      <Header
        user={user}
        onLogout={handleLogout}
        onSignIn={handleOpenLogin}
        savedNewsPage={isSavedNews}
      />
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <HeaderWithRoute />
        {showSuccessModal && (
          <RegistrationSuccessModal
            onSignIn={handleSuccessSignIn}
            onClose={handleSuccessClose}
          />
        )}
        {modalType === "login" && (
          <LoginModal
            onClose={handleClose}
            onSignUp={handleOpenRegister}
            onSubmit={handleLoginSubmit}
          />
        )}
        {modalType === "register" && (
          <RegisterModal
            onClose={handleClose}
            onSubmit={handleRegisterSubmit}
            onSignIn={handleOpenLogin}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className={
                    user
                      ? "top-background top-background-logged-in"
                      : "top-background"
                  }
                ></div>
                <Main
                  onSignIn={handleOpenLogin}
                  user={user}
                  onSearch={handleSearch}
                />
                {error && (
                  <div style={{ textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                  </div>
                )}
                {searched && !loading && articles.length === 0 && !error && (
                  <div style={{ textAlign: "center" }}>
                    <p>Nothing Found</p>
                  </div>
                )}
                {searched && (
                  <NewsCardList
                    articles={articles.slice(0, visibleCount)}
                    onSaveArticle={handleSaveArticle}
                    onDeleteArticle={null}
                    showMore={handleShowMore}
                    showMoreVisible={articles.length > visibleCount}
                    user={user}
                    loading={loading}
                  />
                )}
                <About user={user} />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <>
                <hr className="header-nav-line header-nav-line--saved-news" />
                <SavedNews savedArticles={savedArticles} user={user} />
                <Footer />
              </>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
