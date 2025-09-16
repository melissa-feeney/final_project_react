<div className="app__top-background"></div>;
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

function App() {
  const [modalType, setModalType] = useState(null);
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredName, setRegisteredName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRegisterSubmit = ({ name }) => {
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

  const handleLoginSubmit = () => {
    if (registeredName) {
      setUser({ name: registeredName });
    } else {
      setUser({ name: "Elise" });
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
    } catch {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    }
    setLoading(false);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) return prev;

      return [...prev, { ...article, keyword: searchTerm }];
    });
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  const handleLogout = () => {
    setUser(null);
  };

  function HeaderWithRoute() {
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
                      ? "app__top-background app__top-background__logged-in"
                      : "app__top-background"
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
                <hr className="header__nav_line header__nav_line__saved-news" />
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
