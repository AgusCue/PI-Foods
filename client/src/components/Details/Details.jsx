import React from "react";
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail}from '../../actions'
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import img from '../../imagen/home.png'

import './Details.css'

export default function Detail(){
  const dispatch = useDispatch()
  const myRecipe = useSelector((state)=> state.details)
  const {id} = useParams();

  useEffect(()=>{
    dispatch(getDetail(id))
  },[dispatch, id])

  console.log(myRecipe)

  return(
    <div id="alldatail">
      <div className="home1">
        <Link to='/home'>
          <img src={img} alt="alt" width='100px' height='100px'/>
        </Link>
      </div>
      { 
        myRecipe ?
          <div id="todosDetail">
            <p id="detail"><strong>{myRecipe.title}</strong></p>
            <div id="portada">
              <img src={myRecipe.image} alt="img" />
              <div id="portada-uno">
                <p id="detail1"><strong>Diets:  </strong> {!myRecipe.createdInDb ? myRecipe.diets + ' ' : myRecipe.diets.map(e => e.title + (' '))}</p>
                <p id="detail2"><strong>Dish Types:  </strong>{!myRecipe.createdInDb ? myRecipe.dishTypes + ' ' : myRecipe.dishTypes.map(e => e.title + (' '))}</p>
                <p><strong>Health Score:  </strong>{myRecipe.healthScore}</p>
              </div>
            </div>
            <div>
              <p id="detail3"><strong>Summary:</strong>{myRecipe.summary}</p>
              <ul id="listaId">
                {
                  myRecipe.steps?.map((e, index ) =>(
                    <li>
                      <b>{index + 1}: </b>{e}
                    </li>
                  ))
                }
              </ul>
            </div> 
          </div> : <Loading/>
        }
        
      </div>
    )
}




