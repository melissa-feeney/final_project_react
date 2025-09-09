import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function getKeywords(savedArticles) {
  const allKeywords = savedArticles
    .map((article) => article.keyword)
    .filter(Boolean);

  const uniqueKeywords = Array.from(new Set(allKeywords));
  if (uniqueKeywords.length === 0) return null;
  if (uniqueKeywords.length === 1) return uniqueKeywords[0];
  if (uniqueKeywords.length === 2) return uniqueKeywords.join(", ");
  if (uniqueKeywords.length === 3) return uniqueKeywords.join(", ");

  return `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${
    uniqueKeywords.length - 2
  } other`;
}

function SavedNews({ savedArticles, user }) {
  const [articles, setArticles] = React.useState(savedArticles);
  const keywordsSummary = getKeywords(articles);
  const handleDeleteArticle = (articleToDelete) => {
    setArticles((prev) => prev.filter((a) => a.url !== articleToDelete.url));
  };
  return (
    <div className="saved-news-container">
      <div className="saved-news-subtitle">Saved articles</div>
      <h2 className="saved-card-list-title">
        {user?.name}, you have {articles.length} saved articles
      </h2>
      {keywordsSummary && (
        <div className="saved-keywords">
          By keywords: <b>{keywordsSummary}</b>
        </div>
      )}
      <div className="saved-news-articles-section">
        <div className="saved-card-list">
          {articles.length === 0 ? (
            <p>No saved articles yet.</p>
          ) : (
            articles.map((article, idx) => (
              <NewsCard
                key={idx}
                article={article}
                user={user}
                marked={true}
                keyword={article.keyword}
                onDeleteArticle={handleDeleteArticle}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedNews;
