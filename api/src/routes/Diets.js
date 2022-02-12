const { Router } = require ('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db');
const router = Router();
const {API_KEY1} = process.env
const getAllDiet = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=10`);
    const apiDiet = await apiUrl.data.results.map(el => el.diets);
    const dietEach = [];
    apiDiet.map(e =>{
        for (let i=0; i<= e.length; i++){
            if(e[i]!== undefined && !dietEach.includes(e[i])){
            dietEach.push(e[i])}
        };
    });

    /* console.log({dietEach}) */
    dietEach.forEach(one => {
        if(one){
            Diet.findOrCreate({
                where: {
                    name: one
                }
            });
        }
    });

    const allDiets = await Diet.findAll();
    return allDiets
};

router.get('/', async (req, res) =>{
    const dbDiets =  await getAllDiet();
    res.status(200).send(dbDiets)
}); 

// REVISAR ÉSTA RUTA!!! TRAE 9 DIETS DE 11 :(

module.exports = router;