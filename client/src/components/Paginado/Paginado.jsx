import React from "react";

export default function Paginado({allRecipes,recipesPerPage,paginado}){
  const pageNumber = []

  for(let i=0; i<= Math.ceil(allRecipes/recipesPerPage);i++){
    pageNumber.push(i + 1)
  }
  return(
    <nav>
      <ul>
        {pageNumber && pageNumber.map(number =>(
            <li className="paginado" key={number}>
              <a onClick={()=>paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
    )   
}