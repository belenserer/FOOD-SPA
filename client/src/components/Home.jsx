import React from "react";
import s from "./css/home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, filteredRecipesByDiet, orderBy } from '../Redux/actions/index';
import { Link, NavLink } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Pages";
import NavBar from "./NavBar";

export default function Home() {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipes)
    //comienza el current en 1(será la primer página)
    const [currentPage, setCurrentPage] = useState(1)
    
    //Esta es la cantidad de recetas a mostrar por página
    const render = 9

    //para saber cual será el ultimo indice a mostrar
    const lastPageIndex = currentPage * render;

    //para saber cuál será el primer indice a mostrar
    const firstPageIndex = lastPageIndex - render

    //Las 9 recetas a renderizar van a ser resultado de un slice de la totalidad de recetas
  //devolverá un array con los indices definidos desde el primero y el ultimo, dependiendo de en qué pagina me encuentro (valor de currentPage)

  //Este slice es para el paginado
  const currentRender = recipes.slice(firstPageIndex, lastPageIndex);
  

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }



    useEffect(()=>{
        dispatch(getAllRecipes())
    },[dispatch])
    
    //creo la función para que me resetee y vuelva a todas las recetas
    function handleClick(e){
        e.preventDefault(); //para que no recargue la página
        dispatch(getAllRecipes());
    }

    function handleFiltered(e){
        dispatch(filteredRecipesByDiet(e.target.value));
    }

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderBy(e.target.value, "name"))
        setCurrentPage(1);
        
    }

    function handleSortScore(e){
        e.preventDefault();
        let action = orderBy(e.target.value, "spoonacularScore")
        dispatch(action)
        setCurrentPage(1);
        
    }

    return(
        <div className={s.home}>
           
            <h1 className={s.h1}>
                ENCUENTRA QUE COMER HOY
            </h1>
            <br/>
             <NavLink to='/Home/create'>
                Crear Receta
            </NavLink>
            <br/>
            <NavBar/>
            <br/>
            <button className={s.button} onClick={e=> {handleClick(e)}}>
                Volver a todas las recetas
            </button>
            <br/>
            <div>
                <select className={s.select} onChange= {e=> handleFiltered(e)}>
                    <option>Tipo de dieta </option>
                    <option value="all">Todas </option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="paleolithic">Paleolithic</option>
                </select>
                <select className={s.select} onChange= {e=> handleSortScore(e)}>
                    <option value="spoonacularScore">Puntuación</option>
                    <option value= "asc">Menor puntuación </option>
                    <option value="desc">Mayor puntuación</option>
                </select>
                <select className={s.select} onChange= {e=> handleSortName(e)}>
                    <option value= "title">Nombre</option>
                    <option value= "asc">A-Z </option>
                    <option value="desc">Z-A</option>
                </select>
                <br/>
                <Paginado
                    render = {render}
                    allRecipes = {recipes.length}
                    paginado = {paginado}
                />
                {currentRender?.map((el)=>{
                    return (
                        <div key={el.id}>
                            <Link to={'/home/detail/' + el.id}>
                                <Card name={el.name} image={el.image} diets={el.diets} key={el.id} />
                            </Link>
                        </div>
                    );
                })}
                {currentRender.length === 0 && "No existen recetas con ése nombre"}
                <Paginado
                    render = {render}
                    allRecipes = {recipes.length}
                    paginado = {paginado}
                />
            </div>
        </div>
    );
};