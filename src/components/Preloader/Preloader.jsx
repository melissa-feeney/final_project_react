import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader__container">
      <div className="preloader__circle"></div>
      <span>Searching for news...</span>
    </div>
  );
}

export default Preloader;
