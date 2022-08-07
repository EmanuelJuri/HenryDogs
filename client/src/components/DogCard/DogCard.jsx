import React from "react";
import { Link } from 'react-router-dom';

import './DogCard.css'

export default function DogCard({name, image, weight, temperament, id}){
// console.log('temperamentos', temperament)
let temp = "";

Array.isArray(temperament) ?
    temp = temperament.map(t => {
        return t.name
    }).join(", ") : temp = temperament

  return(
      <div className="card">
        <Link className="detail_img" to={`/home/${id}`}>
          <h1 className="title_card">{name}</h1>
          <img className="img_card" src={image} alt="img not found" /* width={'500px'} height={'282px'} */ />          
          <div className="box_temperaments">
            <h3>Temperamentos</h3>
            <h5>{temp}</h5>
          </div>
          <Link className="detail_button" to={`/home/${id}`}>Detalles</Link>
        </Link>
      </div>
  )  
};
