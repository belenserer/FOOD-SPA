
import React from "react";
import s from "./css/landing.module.css"
import {NavLink} from "react-router-dom";

export default function LandingPage(){
    return (
       <div >
            <h1 className={s.h1}>Are  you thinking what to eat?</h1> 
            <h1 className={s.h1}>We have some recipes for you</h1>
            <br/>
            <br/>
           
            <NavLink to={"/home"} className={s.ingresar}>
              Start
            </NavLink>
        </div>
    )
};
       
       
       
    
