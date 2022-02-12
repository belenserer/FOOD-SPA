
import React from "react";
import s from "./css/landing.module.css"
import {NavLink} from "react-router-dom";

export default function LandingPage(){
    return (
       <div >
            <h1 className={s.h1}>No se te ocurre qué comer?</h1> 
            <h1 className={s.h1}>Tengo recetas para darte</h1>
           
            <NavLink to={"/home"} className={s.ingresar}>
              Ingresar
            </NavLink>
        </div>
    )
};
       
       
       
    
