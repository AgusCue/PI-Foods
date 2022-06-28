import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import {postRecipe,getDiet}from '../../actions'
import { useDispatch, useSelector} from "react-redux";
  
import './RecipeCreated.css'

export default function RecipeCreated(){
  const dispatch = useDispatch()
  const history = useHistory()
  const diets = useSelector((state)=>state.diets)
  // const diets = useSelector(state => state.diets)
  const [cantP,setCantP] = useState(1)
  const [indexPaso,setIndexPaso] = useState({})
  const [input,setInput] = useState({
    title:'',
    summary:'',
    steps:[],
    healthScore:'',
    spoonacularScore:'',
    image:'',
    diets:[],
  })


  
//-----------Steps--------------//
  function handleChangePaso(e, i ){
    let paso2 = []
    setIndexPaso({
      ...indexPaso,
      [i]: e.target.value
    })
    for (let i = 0; i < cantP-1; i++) {
      paso2.push(indexPaso[i])
    }
    setInput({
      ...input,
      steps: paso2
    })
  }
  
  function addInputPaso(){
    let paso = []
    if(cantP<= 10){
      setIndexPaso({
        ...indexPaso,
        [cantP]: ''
      })
      for (let i = 0; i < cantP; i++) {
        paso.push(indexPaso[i])
      }
      setCantP(1+cantP)
      setInput({
        ...input,
        steps: paso
      })
    }
  } 





//-----------Datos--------------//
  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })  
  }





  //-----------Formulario--------------//
  function handleSubmit(e){
    e.preventDefault()
    dispatch(postRecipe(input))
    alert('Create recipe!! wiii')
    setInput({
      title:'',
      summary:'',
      steps:[],
      healthScore:'',
      spoonacularScore:'',
      image:'',
      diets:[],
    })
    history.push('/home')
  }
  


  //-----------CheckBox--------------//
  function handleCheckBox(e) {
    const clicked = diets.filter((d) => e.target.value === d.title).map((d) => d.title);
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, ...clicked],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((e) => e !== clicked[0]),
      });
    }
  }
  
  useEffect(()=>{
    dispatch(getDiet());
  },[dispatch])
  
  return (
    <div className="colum">
      <Link to= '/home'><button>Volver</button></Link>
        <h1>Created your recipe</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <button type="submit">CREATED RECIPE</button>
            <div className="inputs" >
              <label>Title</label>
              <input onChange={handleChange} type='text' value={input.title} name='title'/>
              <label>Summary</label> 
              <input onChange={handleChange} type='text' value={input.summary} name='summary'/>   
              <label>Health Score</label> 
              <input onChange={handleChange} type='text' value={input.healthScore} name='healthScore'/>
              <label>Poonacular Score</label> 
              <input onChange={handleChange} type='text' value={input.spoonacularScore} name='spoonacularScore'/>
              <label>Image</label> 
              <input onChange={handleChange} type='text' value={input.image} name='image'/>
              <div className="creardietas">
              <div>
                <label>Diets:</label>
                  <div className="check">
                    {diets.map((e) => (
                      <div >
                        <input
                            type="checkbox"
                            value={e.title}
                            name={e.title}
                            onChange={(e) => handleCheckBox(e)}
                        />
                        <h5>{e.title}</h5>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
            <label>Steps for Preparation</label>
              <button onClick={()=>{addInputPaso()}}>ADD STEP</button>
              {
                indexPaso && input.steps.map((p, i)=>{
                  return(
                    <input type='text' value={indexPaso[i]} name='steps' onChange={e => handleChangePaso(e,i)} required/>
                  )
                })
              }
            </div>
          </form>
    </div>
  )
}








