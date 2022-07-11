import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipeByDiets, orderByScore, orderByTitle } from "../../actions";

import "./Filtrado.css";

export default function Filtrado({ setCurrentPage, setOrden, allDiets }) {
  const dispatch = useDispatch();
  // const allDiets = useSelector((state) => state.diets);

  // useEffect(() => {
  //   dispatch(getDiet());
  // }, []);

  function handleFilterDiets(e) {
    e.preventDefault();
    dispatch(filterRecipeByDiets(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortHealthy(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="filtrado">
      <div id="filtro">
        <div className="filtroAZ">
          <span>
            <strong> Order by decreasing or increasing:</strong>{" "}
          </span>
          <select onChange={(e) => handleSort(e)}>
            <option value="asc" style={{ backgroundColor: "transparent" }}>
              A - Z
            </option>
            <option value="des" style={{ backgroundColor: "transparent" }}>
              Z - A
            </option>
          </select>
        </div>
        <div className="filtroHS">
          <span>
            <strong> Order by Healthy Score:</strong>{" "}
          </span>
          <select
            onChange={(e) => handleSortHealthy(e)}
            defaultValue="HEALTH SCORE"
          >
            <option value="morehealthy">MORE HEALTHY</option>
            <option value="lesshealthy">LESS HEALTHY</option>
          </select>
        </div>
        <div className="filtroDieta">
          <span>
            <strong> Filter by Diet: </strong>
          </span>
          <hr />
          <button value="all" onClick={(e) => handleFilterDiets(e)}>
            ALL
          </button>
          <hr />
          {allDiets &&
            allDiets?.map((d, t) => {
              return (
                <div>
                  <button
                    key={t}
                    value={d.title}
                    onClick={(e) => handleFilterDiets(e)}
                  >
                    {d.title.toUpperCase()}
                  </button>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
