import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { getRecipe, cleanAllrecipe } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Filtrado from "../Filtrado/Filtrado";
import Loading from "../Loading/Loading";
import img from "../../imagen/imagen2.png";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOflastRecipe = currentPage * recipesPerPage;
  const indexOffirstRecipe = indexOflastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOffirstRecipe, indexOflastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipe());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(cleanAllrecipe());
    dispatch(getRecipe());
  }
  return (
    <div>
      {allRecipes.length > 0 ? (
        <div className="background">
          <div className="left">
            <Filtrado setCurrentPage={setCurrentPage} setOrden={setOrden} />
            <SearchBar />
          </div>
          <div className="rigth">
            <div className="crear">
              <div className="paginado-refres">
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  <img src={img} alt="img" />
                </button>
                <Paginado
                  recipesPerPage={recipesPerPage}
                  allRecipes={allRecipes.length}
                  paginado={paginado}
                />
              </div>
              <div className="agus">
                <Link
                  className="link"
                  to="/recipe"
                  style={{ textDecoration: "none" }}
                >
                  <strong>Create recipe</strong>
                </Link>
              </div>
            </div>
            <div className="cards">
              {currentRecipe?.map((e) => {
                return (
                  <Link
                    id="detail"
                    to={`/recipe/${e.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      key={e.id}
                      id={e.id}
                      title={e.title}
                      diets={e.diets.join(", ")}
                      image={e.image}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
