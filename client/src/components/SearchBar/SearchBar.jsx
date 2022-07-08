import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../actions";
import img from "../../imagen/cooking.png";

import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return alert("Search recipe");
    dispatch(getNameRecipe(name.toLowerCase()));
    setCurrentPage(1);
  }

  return (
    <div className="searchBar">
      <input
        className="buscar"
        type="text"
        placeholder="Search recipe..."
        onChange={(e) => handleInput(e)}
      />
      <button className="boton2" onClick={(e) => handleSubmit(e)} type="submit">
        <img src={img} alt="img" />
      </button>
    </div>
  );
}
