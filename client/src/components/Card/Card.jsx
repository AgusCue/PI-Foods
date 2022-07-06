import React from "react";

import "../Card/Card.css";

export default function card({ title, image, diets }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <h3>{diets.toUpperCase()}</h3>
      <img className="imagen" src={image} alt="img" />
    </div>
  );
}
