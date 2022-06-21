import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipe, filterRecipeByDiets} from '../../actions'; 
import {Link} from 'react-router-dom';
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";

import './Home.css'



export default function Home(){
  const dispatch = useDispatch()
  const allRecipes = useSelector(state=>state.recipes)
  // const [/*orden*/, setOrden] = useState("");
  //------------------Paginado--------------------//

  const [currentPage,setCurrentPage]= useState(1)
  const [recipesPerPage,] = useState (9)
  const indexOflastRecipe = currentPage * recipesPerPage
  const indexOffirstRecipe = indexOflastRecipe - recipesPerPage
  const currentRecipe = allRecipes.slice(indexOffirstRecipe,indexOflastRecipe)


  const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  useEffect(()=>{
    dispatch(getRecipe())
  },[dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipe());
  }

  function handleFilterDiets(e){
    e.preventDefault()
    dispatch(filterRecipeByDiets(e.target.value))
  }

  return(
    <div className="fondo">
      <h1>Prepare your favorite dish</h1>
      <Link to='/recipe'>Created recipe</Link>
      <button onClick={e=>{handleClick(e)}}>Refresh</button>
      <div>
        <select>
          <option value ='asc'>A-Z</option>
          <option value = 'des'>Z-A</option>
        </select>
        <select onChange={e=>handleFilterDiets(e)}>
          <option value= 'all'>ALL DIETS</option>
          <option value= "dairyFree">DAIRY FREE</option>
          <option value= "glutenFree">GLUTEN FREE</option>
          <option value= "lowFodmap">LOW FOD MAP</option>
          <option value= "ketogenic">KETOGENIC</option>
          <option value= "paleolithic">PALEOLITHIC</option>
          <option value= "pescatarian">PESCATARIAN</option>
          <option value= "primal">PRIMAL</option>
          <option value= "vegan">VEGAN</option>
          <option value= 'vegetarian'>VEGETARIAN</option>
          <option value= "whole 30">WHOLE 30</option>
          <option value= "lacto ovo vegetarian">LACTO OVO VEGETARIAN</option>
        </select>
        <select>
          <option value= 'all'>ALL</option>
          <option value= 'creado'>CREATED</option>
          <option value= 'exist'>EXIST</option>
        </select>
        

        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado = {paginado}
        />
        <div className="row">
        {
          currentRecipe?.map(e=>{
            return(
              <Link to={'/home/'+ e.id} style= {{textDecoration:"none"}} >
              <Card key={e.id} title={e.title} summary={e.summary} image={e.image}/>
              </Link>
            )
          })
        }
        </div>
      </div>
    </div>
       
    )
}