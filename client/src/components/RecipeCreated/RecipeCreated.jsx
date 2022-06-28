import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import {postRecipe,getDiet}from '../../actions'
import { useDispatch, useSelector} from "react-redux";
import img from '../../imagen/homes.png'
  
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
      <div className="colum-home">
      <Link to= '/home'><img src={img} alt="img" width='100px' height='100px' /></Link>
      </div>
        <h1>Created your recipe</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="inputs" >
              <div className="inputs-left">
              <input placeholder="Title"  onChange={handleChange} type='text' value={input.title} name='title' autocomplete="off"/>
              <input placeholder="Summary"  onChange={handleChange} type='text' value={input.summary} name='summary' autocomplete="off"/>    
              <input placeholder="Health Score"  onChange={handleChange} type='text' value={input.healthScore} name='healthScore' autocomplete="off"/>
              <input placeholder="Poonacular Score"  onChange={handleChange} type='text' value={input.spoonacularScore} name='spoonacularScore' autocomplete="off"/>
              <input placeholder="Image"  onChange={handleChange} type='text' value={input.image} name='image' autocomplete="off"/>
              <div className="creardietas">
                  <label>TIPES OF DIETS</label>
                    <div className="check">
                      {diets.map((e) => (
                        <div className="check-sub">
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
              <div className="inputs-rigth">       
                <label>Steps for Preparation</label>
                  <button onClick={()=>{addInputPaso()}}>ADD STEP</button>
                {
                  indexPaso && input.steps.map((p, i)=>{
                    return(
                      <input type='text' value={indexPaso[i]} name='steps' onChange={e => handleChangePaso(e,i)} required autocomplete="off"/>
                      )
                    })
                  }
              </div>
            </div>
            <button type="submit">CREATED RECIPE</button>
          </form>
    </div>
  )
}








