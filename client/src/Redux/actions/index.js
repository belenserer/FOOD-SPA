import axios from "axios";
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const ORDER_BY = 'ORDER_BY';
//export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_DETAIL = 'GET_DETAIL';




export function getAllRecipes(){
    return async function(dispatch){
        var json = await axios.get ('http://localhost:3001/recipes');
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: json.data
        })
    }
};

export function getDiets(){
    return async function(dispatch){
        var json = await axios.get ('http://localhost:3001/diets')
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
};

export function postRecipe(payload){
    
    return async function(distpach){
        try{
            var json = await axios.post('http://localhost:3001/recipes' , payload);
                return json
        } catch (error){
            console.log(error)
        }
        
    }
};

export function filteredRecipesByDiet(payload){
    return {
        type: FILTER_BY_DIET,
        payload
    }
};

export function orderBy(orden){
    return {
        type: ORDER_BY,
        payload: orden
    }
};


export function getNameRecipes(payload){
    return async function (distpach){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + payload)
            return distpach({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
};

export function getDetail(id){
    return async function(distpach){
        try{
            var json= await axios.get('http://localhost:3001/recipes/' + id);
            console.log(json.data)
            return distpach({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
};


