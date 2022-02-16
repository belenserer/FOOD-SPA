import React from "react";
import { useState, useEffect } from "react";
import { postRecipe, getDiets } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// REVISAR ÉSTA FUNCION. CREA LAS RECETAS PERO NO MANDA LA ACCION EN LA CONSOLA!

export default function CreateRecipe(){
    const dispatch = useDispatch();
    //const diets = useSelector(state=> state.diets);
    const [errors, setErrors] = useState({})
    console.log(errors)


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

    const validatorForm = (newForm) => {
        let check = {};
        //validar nombre
        if(newForm){
            if(!newForm.name.length) check.name = "Must have a name";
            //else if (!newForm.name.split("").some((n) =>  isNaN(Number(n)))) check.name = "Numbers not allowed"
            else if (newForm.name.length < 3) check.name = "Must have more than 3 letters";
            else if (!newForm.name.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.name = "Only letters are allowed";
            }
        } else { 
            check.name = undefined
        }
        
        // validar resumen del plato
        if (newForm){
            if(!newForm.summary.length) check.summary = "Must have a summary";
            else if (newForm.summary.length < 4) check.summary = "Summary must have more than 4 letters";
            else if (!newForm.summary.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.summary = "Only letters are allowed";
            }
        } else { 
            check.summary = undefined
            }
        
        // validar tipo de plato
        if (newForm){
            if(!newForm.dishTypes.length) check.dishTypes = "Must have a Dish type";
            else if (!newForm.dishTypes.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.dishTypes = "Only letters are allowed";
            }
        } else { 
            check.dishTypes = undefined
            }
        
        //validar puntuación
        if (newForm){
            if(!newForm.spoonacularScore.length) check.spoonacularScore = "Must have a Score";
            else if (Number(newForm.spoonacularScore <1)) check.spoonacularScore = "Score cannot be less than 1";
            else if(Number(newForm.spoonacularScore >100)) check.spoonacularScore = "Score cannot be higher than 100";
        } else { 
            check.spoonacularScore = undefined
            }
        
        // validar nivel de comida saludable
        if (newForm){
            if(!newForm.healthScore.length) check.healthScore = "Must have a Healt Score";
            else if (Number(newForm.healthScore <1)) check.healthScore = "Score cannot be less than 1";
            else if(Number(newForm.healthScore >100)) check.healthScore = "Score cannot be higher than 100";
        } else { 
            check.healthScore = undefined
            }

        //validar los pasos
        if (newForm){
            if(!newForm.steps.length) check.steps = "Must have a Steps";
            else if (!newForm.steps.split("").every((l) => /[a-zñéóúíá\s]/i.test(l))) {
                check.steps = "Only letters are allowed";
            }
        } else { 
            check.steps = undefined
            }

    
        return check
    };


    const onName = (v) => {
        const newForm = {
            ...form,
            name: v.target.value
        }
        setForm(newForm);
        let check = validatorForm(newForm)
        setErrors(check)

    };
    const onSummary = (v) => {
        const newForm = {
            ...form,
            summary: v.target.value
        }
        setForm(newForm);
        let check = validatorForm(newForm)
        setErrors(check)
    };

    const onDishTypes = (v) => {
        const newForm = {
            ...form,
            dishTypes: v.target.value
        }
        setForm(newForm);
        let check = validatorForm(newForm)
        setErrors(check)
    };

    const onSteps = (v) => {
        const newForm = {
            ...form,
            steps: v.target.value
        }
        setForm(newForm);
        let check = validatorForm(newForm)
        setErrors(check)
    };

    const onScore = (v) => {
        const newForm = {
            ...form,
            spoonacularScore: v.target.value
        }
        setForm(newForm);
       let check = validatorForm(newForm)
        setErrors(check)
    };
    
   

    const onHealtScore = (v) => {
        const newForm = {
            ...form,
            healthScore: v.target.value
        }
        setForm(newForm);  
        let check = validatorForm(newForm)
        setErrors(check)
    };
    

    const onDiets = (value) => {
        if (!selectedDiets.includes(value.target.value)) {
            setSelectedDiets([...selectedDiets, value.target.value]);
        }
        let check = validatorForm(form)
        setErrors(check)
    };

    const deleteDiet = (e) => {
        e.preventDefault();
        setSelectedDiets((prev) => prev.filter((d)=> d !== e.target.name));
    };

    const onSubmit = (e)=> {
        e.preventDefault();
        console.log({errors})
        
        if (errors.name || errors.summary || errors.spoonacularScore || errors.healthScore || errors.dishTypes || errors.steps) {
            alert("You must correct errors")
        } else if(selectedDiets.length<2){
            alert("You must select at least 2 diets")
        } else {
            dispatch(postRecipe({...form, diets: selectedDiets}));
            (alert("Recipe created succesfully"))
        }

    };


    return (
        <div>
            <NavLink to='/home'>
                <button>Home</button>
            </NavLink>
            <h1>Create your recipe</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <h4>Name</h4>
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
                    <h4>Summary</h4>
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
                    <h4>Dish Types</h4>
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
                    <h4>Score</h4>
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
                    <h4>Health Score</h4>
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
                    <h4>Steps/Instructions</h4>
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
                    <h4>Type of diet</h4>
                    <select onChange={(e)=> onDiets(e)}>
                        <option value="all">All </option>
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
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
};