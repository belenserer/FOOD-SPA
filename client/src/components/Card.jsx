import React from "react";
import s from "./css/card.module.css"

export default function Card({name, image, diets}){
    const diet= diets? diets.map((el)=> el.name).join(', ') : diets
    //const mapped = diet.join(', ')
    const img = image? image : 'https://image.freepik.com/foto-gratis/pizarra-negra-palabra-food-verduras-alrededor_1220-556.jpg'
    //'https://i.ytimg.com/vi/PKQHs7DuweM/maxresdefault.jpg'
    return(
        <div>
            <h2>{name}</h2>
            <h3>{diet}</h3>
            <img className={s.img}
            src={img} alt="img not found" />
        </div>
    );
};