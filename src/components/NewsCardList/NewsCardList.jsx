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
      <div className="newsCardList">
        <Preloader />
      </div>
    );
  }

  return (
    <section className="newsCardList">
      <h2 className="newsCardList__title">Search results</h2>
      {articles && articles.length > 0 ? (
        <ul className="newsCardList__list">
          {articles.map((article, idx) => (
            <li key={article.url || idx} className="newsCardList__item">
              <NewsCard
                article={article}
                onSaveArticle={onSaveArticle}
                onDeleteArticle={onDeleteArticle}
                user={user}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="newsCardList__empty">No articles found.</p>
      )}
      {showMoreVisible && (
        <button className="newsCardList__showMoreBtn" onClick={showMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
