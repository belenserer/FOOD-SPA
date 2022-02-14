import { GET_ALL_RECIPES, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, GET_NAME_RECIPES, GET_DIETS, POST_RECIPE, GET_DETAIL} from "../actions";

const initialState = {
    recipes : [],
    allRecipes: [],
    diets: []

}


function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        
        case POST_RECIPE:
            return {
                ...state,
            }

        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes
            const recipesFiltered = action.payload === 'all'
            ? allRecipes 
            : allRecipes.filter(el => el.diets.map( d => d.name).includes(action.payload));
               /*  el => el.diets.some(d => d.name === action.payload)); */
            return {
                ...state,
                recipes: recipesFiltered

            }
        
        case ORDER_BY_NAME:
            let orderByName = action.payload === "asc" ?
            state.recipes.sort(function (a,b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()){ return 1};
                if (b.name.toLowerCase() > a.name.toLowerCase()){ return -1};
                return 0;
            }) :
            state.recipes.sort(function (a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){return -1};
                if (b.name.toLowerCase() > a.name.toLowerCase()){return 1};
                return 0;
            })
            return {
                ...state,
                recipes: orderByName
            }
        
        case ORDER_BY_SCORE:
            let orderByScore = action.payload === "asc" ?
            state.recipes.sort(function (a,b) {
                if (a.spoonacularScore > b.spoonacularScore){ return 1};
                if (b.spoonacularScore > a.spoonacularScore){ return -1};
                return 0;
            }) :
            state.recipes.sort(function (a,b){
                if(a.spoonacularScore > b.spoonacularScore){return -1};
                if (b.spoonacularScore > a.spoonacularScore){return 1};
                return 0;
            })
            return {
                ...state,
                recipes: orderByScore
                }
    
        case GET_NAME_RECIPES:
            return {
                ...state,
                recipes: action.payload
                }

        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }

        default:
            return state
    }
};

export default rootReducer;