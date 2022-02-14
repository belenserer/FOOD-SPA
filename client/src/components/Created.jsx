import React from "react";
import { useState, useEffect } from "react";
import { postRecipe, getDiets, getAllRecipes } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// REVISAR ÉSTA FUNCION. CREA LAS RECETAS PERO NO MANDA LA ACCION EN LA CONSOLA!

export default function CreateRecipe(){
    const dispatch = useDispatch();
    const diets = useSelector(state=> state.diets);
    const [errors, setErrors] = useState({})


    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const [selectedDiets, setSelectedDiets] = useState([]);
    
    const [form, setForm] = useState({
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        dishTypes:"",
        steps: ""
    });

    const validatorForm = () => {
        let check = {};
        //validar nombre
        if(form.hasOwnProperty('name')){
            if(!form.name.length) check.name = "Debes completar el campo Nombre";
            else if (form.name.length < 4) check.name = "El nombre de la comida debe contener al menos 4 caracteres";
            else if (!form.name.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.name = "No se admiten valores diferentes a letras";
            }
        } else { 
            check.name = undefined
        }
        
        // validar resumen del plato
        if (form.hasOwnProperty('summary')){
            if(!form.summary.length) check.summary = "Debes completar el campo Resumen del plato";
            else if (form.summary.length < 10) check.summary = "El resumen del plato de la comida debe contener al menos 10 caracteres";
            else if (!form.summary.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.summary = "No se admiten símbolos, sólo texto";
            }
        } else { 
            check.summary = undefined
            }
        
        // validar tipo de plato
        if (form.hasOwnProperty('dishTypes')){
            if(!form.dishTypes.length) check.dishTypes = "Debes completar el campo Tipo de plato";
            else if (!form.dishTypes.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.dishTypes = "No se admiten símbolos, sólo texto";
            }
        } else { 
            check.dishTypes = undefined
            }
        
        //validar puntuación
        if (form.hasOwnProperty('spoonacularScore')){
            if(!form.spoonacularScore.length) check.spoonacularScore = "Debes completar la puntuación de la receta";
            else if (form.spoonacularScore <1) check.spoonacularScore = "La puntuación no puede ser menor a 1";
            else if(form.spoonacularScore >100) check.spoonacularScore = "La puntuación no puede ser mayor a 100";
        } else { 
            check.spoonacularScore = undefined
            }
        
        // validar nivel de comida saludable
        if (form.hasOwnProperty('healthScore')){
            if(!form.healthScore.length) check.healthScore = "Debes completar la puntuación de la receta";
            else if (form.healthScore <1) check.healthScore = "La puntuación no puede ser menor a 1";
            else if(form.healthScore >100) check.healthScore = "La puntuación no puede ser mayor a 100";
        } else { 
            check.healthScore = undefined
            }

        //validar los pasos
        if (form.hasOwnProperty('steps')){
            if(!form.steps.length) check.steps = "Debes completar el campo Pasos a realizar";
            else if (!form.steps.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.steps = "No se admiten símbolos, sólo texto";
            }
        } else { 
            check.steps = undefined
            }
    
        //validar dietas
        if (!selectedDiets.length) check.diets = "Debes seleccionar al menos una dieta";
        else { check.diets = undefined}
    
        return check
    };
    /* let navigate = useNavigate();

    const goHome = ()=>{
        dispatch(getAllRecipes);
        navigate('/home');
    }; */


    const onName = (v) => {
        setForm((prev) => {
            return {
                ...prev,
                name: v.target.value
                };
                        
        });
        let check = validatorForm()
        setErrors(check)

    };
    const onSummary = (v) => {
        setForm((prev) => {
            return {
                ...prev,
                summary: v.target.value
                };
        });
        let check = validatorForm()
        setErrors(check)
    };

    const onDishTypes = (v) => {
        setForm((prev) => {
            return {
                ...prev,
                dishTypes: v.target.value
                };
        });
        let check = validatorForm()
        setErrors(check)
    };

    const onSteps = (v) => {
        setForm((prev) => {
            return {
                ...prev,
                steps: v.target.value
            };
        });
        let check = validatorForm()
        setErrors(check)
    };

    const onScore = (v) => {
         setForm((prev) => {
            return {
                ...prev,
                spoonacularScore: v.target.value
            };
        });
        let check = validatorForm()
        setErrors(check)
    };
    
   

    const onHealtScore = (v) => {
        setForm((prev) => {
            return {
             ...prev,
                healthScore: v.target.value
            };
        });  
        let check = validatorForm()
        setErrors(check)
    };
    

    const onDiets = (value) => {
        if (!selectedDiets.includes(value.target.value)) setSelectedDiets((prev) => [...prev, value.target.value]);
        let check = validatorForm()
        setErrors(check)
    };

    const deleteDiet = (e) => {
        e.preventDefault();
        setSelectedDiets((prev) => prev.filter((d)=> d !== e.target.name));
    };

    const onSubmit = (e)=> {
        e.preventDefault();
        let check = validatorForm()
        setErrors(check)
        //console.log(selectedDiets, "FORM DIETS")

        //let allGood = { ...form, diets: selectedDiets.join(", ")};
        //console.log(allGood, "ALL GOOD")
        dispatch(postRecipe({...form, diets: selectedDiets}));
        (alert("Receta creada correctamente"));

    };


    return (
        <div>
            <NavLink to='/home'>
                <button>Volver</button>
            </NavLink>
            <h1>Crea tu receta</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <h4>Nombre</h4>
                    <input 
                    required
                    onChange={(e) => onName(e)}
                    type="text" 
                    name="name"
                    value={form.name} 
                    />
                    <br/>
                    {errors.name && (
                        <span>{errors.name}</span>
                        )}
                </div>
                
                <div>
                    <h4>Resumen del plato</h4>
                    <input
                    required
                    onChange={(e) => onSummary(e)} 
                    type="text" 
                    name="summary"
                    value= {form.summary} 
                    />
                    <br/>
                    {errors.summary && (
                        <span>{errors.summary}</span>
                        )}
                </div>
                <div>
                    <h4>Tipo de plato</h4>
                    <input
                    required
                    onChange={(e) => onDishTypes(e)} 
                    type="text" 
                    name="dishTypes"
                    value= {form.dishTypes} 
                    />
                    <br/>
                    {errors.dishTypes && (
                        <span>{errors.dishTypes}</span>
                        )}
                </div>
                
                <div>
                    <h4>Puntuación</h4>
                    <input 
                    required
                    onChange={(e)=> onScore(e)}
                    type="number" 
                    name="spoonacularScore"
                    value= {form.spoonacularScore} 
                    />
                    <br/>
                    {errors.spoonacularScore && (
                        <span>{errors.spoonacularScore}</span>
                        )}
                </div>
                
                <div>
                    <h4>Es saludable?</h4>
                    <input 
                    required
                    onChange={(e) => onHealtScore(e)}
                    type="number" 
                    name="healthScore"
                    value= {form.healthScore} 
                    />
                    <br/>
                    {errors.healthScore && (
                        <span>{errors.healthScore}</span>
                        )}
                </div>

                <div>
                    <h4>Pasos a realizar</h4>
                    <input
                    required
                    onChange={(e) => onSteps(e)} 
                    type="text" 
                    name="steps"
                    value= {form.steps} 
                    />
                    <br/>
                    {errors.steps && (
                        <span>{errors.steps}</span>
                        )}
                </div>

                <div>
                    <h4>Tipo de dietas</h4>
                    <select onChange={(e)=> onDiets(e)}>
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
                    <br/>
                    {errors.diets && (
                        <span>{errors.diets}</span>
                        )}
                    {/* <ul><li>{selectedDiets.join(", ")}</li></ul> */}
                    <div>
                        {selectedDiets.map((diet) => (
                            <span key={diet}>
                                {diet}
                                <button name={diet} onClick={(e) => deleteDiet(e)}>
                                    X
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <button type="submit">Crear Receta</button>
            </form>
        </div>
    )
};