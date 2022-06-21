import React from "react";

import '../Card/Card.css'

export default function card({title,image,summary}){
  return(
    <div className="card">
        <h3>{title}</h3>
      <div className="detalle">
        <h5>{summary}</h5>
      </div>
      <div className= 'imagen' >
        <img src={image} alt="img" width='200px' height='200px'/>
      </div>
    </div>
  )
}