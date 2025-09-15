import React from "react";
import "./NewsCard.css";
import trashcanIcon from "../../assets/trashcan.svg";
import trashcanHoverIcon from "../../assets/trashcan-hover.svg";

function NewsCard({
  article,
  user,
  onSaveArticle,
  onDeleteArticle,
  marked: markedProp,
  keyword,
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [marked, setMarked] = React.useState(!!markedProp);
  const [hovered, setHovered] = React.useState(false);

  const handleSaveClick = () => {
    if (user) {
      setMarked((prev) => {
        const newMarked = !prev;
        if (newMarked && onSaveArticle) {
          onSaveArticle(article);
        }
        return newMarked;
      });
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDeleteArticle) {
      onDeleteArticle(article);
    }
  };

  const handleDeleteMouseEnter = () => {
    setShowTooltip(true);
    setHovered(true);
  };
  const handleDeleteMouseLeave = () => {
    setShowTooltip(false);
    setHovered(false);
  };

  let strokeColor = "#B6BCBF";
  let fillColor = "transparent";
  if (marked) {
    strokeColor = "#2F71E5";
    fillColor = "#2F71E5";
  } else if (hovered && user) {
    strokeColor = "#1A1B22";
  }
  return (
    <div
      className="newsCard"
      style={{
        position: "relative",
        cursor: onDeleteArticle ? "pointer" : "default",
      }}
      onClick={
        onDeleteArticle
          ? () => window.open(article.url, "_blank", "noopener,noreferrer")
          : undefined
      }
    >
      {onDeleteArticle && (
        <div className="newsCard__topRow">
          {keyword && <div className="newsCard__keywordBadge">{keyword}</div>}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {showTooltip && (
              <button
                className="newsCard__delete-tooltipBtn"
                tabIndex="-1"
                type="button"
                disabled
              >
                Remove from saved
              </button>
            )}
            <button
              className="newsCard__deleteBtn"
              onClick={handleDeleteClick}
              aria-label="Remove from saved"
              onMouseEnter={handleDeleteMouseEnter}
              onMouseLeave={handleDeleteMouseLeave}
            >
              <span className="trashcan-bg"></span>
              <img
                src={hovered ? trashcanHoverIcon : trashcanIcon}
                alt="Delete"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      )}
      {!onDeleteArticle && (
        <div
          className={`save-icon-wrapper${!user ? " inactive" : ""}`}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
          onMouseEnter={handleDeleteMouseEnter}
          onMouseLeave={handleDeleteMouseLeave}
          onClick={handleSaveClick}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
            style={{
              cursor: user ? "pointer" : "not-allowed",
              transition: "fill 0.2s, stroke 0.2s",
            }}
          >
            <path d="M6 4v16l6-5.333L18 20V4z" />
          </svg>
          {!user && showTooltip && (
            <div
              className="save-tooltip"
              style={{
                position: "absolute",
                top: -32,
                right: 0,
                background: "#fff",
                color: "#222",
                padding: "6px 12px",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                fontSize: "0.95em",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Sign in to save articles
            </div>
          )}
        </div>
      )}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="newsCard__image"
        />
      )}
      <div className="newsCard__content">
        <p className="newsCard__date">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="newsCard__title">{article.title}</h3>
        {article.location && (
          <p className="newsCard__location">{article.location}</p>
        )}
        <p className="newsCard__description">{article.description}</p>
        <div className="newsCard__source">{article.source.name}</div>
      </div>
    </div>
  );
}

export default NewsCard;
