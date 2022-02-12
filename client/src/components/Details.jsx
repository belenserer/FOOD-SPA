import React from "react";
import s from "./css/details.module.css"
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect } from "react";



export default function Detail(props){
    const dispatch = useDispatch()
    let { id } = useParams();

    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch, id])

    const recipe = useSelector((state)=> state.recipes)
    //const steps = thisRecipe.analyzedInstructions.map((s)=> s.steps.map((el) => el.step));
    //const diets = thisRecipe.diets.map(el => el.name).join(", ")
    let thisRecipe = recipe.find((r)=> r.id.toString() === id.toString());
    //console.log(thisRecipe, "THIS RECIPE")
    let diets = thisRecipe && thisRecipe.diets.map(el=> el.name).join(", ");
    console.log(thisRecipe)
    let dishTypes = thisRecipe && 
                        (!thisRecipe.createdInDb ? thisRecipe.dishTypes.join(', ') : thisRecipe.dishTypes)

    let image = thisRecipe &&
                (!thisRecipe.createdInDb ? thisRecipe.image : 'https://i.ytimg.com/vi/PKQHs7DuweM/maxresdefault.jpg')
    //console.log(thisRecipe, "ACA ES")
    return (
        <div className={s.details}> 
            {
                thisRecipe !== undefined ?
                <div>
                    <img className={s.img} src= {image} alt="img not found" />
                     <h1>{thisRecipe.name}</h1>
                    <h2>Dish types</h2>
                        <p>{dishTypes}</p>
                    <h2>Diet type</h2>
                        <p>{diets}</p>  
                    <h2>Score</h2>
                        <p>{thisRecipe.spoonacularScore}</p>
                    <h2>Healt Score</h2>
                        <p>{thisRecipe.healthScore} </p>
                    <h2>Steps</h2>
                        <p>{thisRecipe.steps} </p>

                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            
        </div>
    )
};