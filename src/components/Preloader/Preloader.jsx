import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader-container">
      <div className="circle-preloader"></div>
      <span>Searching for news...</span>
    </div>
  );
}

export default Preloader;
