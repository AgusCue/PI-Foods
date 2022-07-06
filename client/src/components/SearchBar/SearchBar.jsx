import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../actions";
import img from "../../imagen/cooking.png";

import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setTitle] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name.toLowerCase()));
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
