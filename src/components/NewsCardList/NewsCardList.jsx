import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";

function NewsCardList({
  articles,
  onSaveArticle,
  onDeleteArticle,
  showMore,
  showMoreVisible,
  user,
  loading,
}) {
  if (loading) {
    return (
      <div className="news-card-list">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      {articles && articles.length > 0 ? (
        articles.map((article, idx) => (
          <NewsCard
            key={article.url || idx}
            article={article}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
            user={user}
          />
        ))
      ) : (
        <p className="news-card-list__empty">No articles found.</p>
      )}
      {showMoreVisible && (
        <button className="show-more-btn" onClick={showMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
