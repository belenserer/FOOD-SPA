const { Router } = require ('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
require('dotenv').config();
const {API_KEY3} = process.env
const router = Router();


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&number=10&addRecipeInformation=true`);
    //console.log({apiUrl}) 

    const apiInfo = await apiUrl.data.results.map((el) => {
      /* console.log('ERROR DONDE?', apiInfo)  */
      
     return {
        id: el.id,
        name: el.title,
        summary: el.summary,
        spoonacularScore: el.spoonacularScore,
        healthScore: el.healthScore,
        steps: el.analyzedInstructions.map((s)=> s.steps.map((el) => el.step)),
        image: el.image,
        diets: el.diets.map((e) => { return {name: e}}),
        dishTypes: el.dishTypes
      };
     
    });

    /* console.log({apiInfo}) */

    return apiInfo;

  };



  const getDbInfo = async () => {
      return await Recipe.findAll({
          include: Diet
      })
      //{
      //    where: {
      //        model: Diet,
      //        atribute: ['name']
      //    }
      //})
  };

  const getAllRecipes = async () => {
      const apiInfo = await getApiInfo();
      /* console.log("after getApiInfo") */
      const dbInfo = await getDbInfo();
      /* console.log("after getDBInfo") */
      const allInfo = apiInfo.concat(dbInfo)
      /* console.log("after allInfo") */
      return allInfo
  };

router.get('/', async (req, res) =>{
    const { name } = req.query
    const allRecipes = await getAllRecipes();
    
    if (name){
        let recipeName = await allRecipes.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        res.status(200).send(recipeName)
        /* res.status(404).send('No existe el plato buscado'); */
    } else {
        res.status(200).send(allRecipes)
    }
});

router.get('/:idRecipe', async (req, res) =>{
    try {
    const { idRecipe } = req.params
    let allRecipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&number=10&addRecipeInformation=true`);
    let one = await allRecipes.data.results.find(el => parseInt(el.id) === parseInt(idRecipe))
    /* console.log({one}) */
    res.json({
        id: one.id,
        name: one.title,
        summary: one.summary,
        spoonacularScore: one.spoonacularScore,
        healthScore: one.healthScore,
        steps: one.analyzedInstructions.map((s)=> s.steps.map((el) => el.step)),
        image: one.image,
        diets: one.diets.map((e) => { return {name: e}}),
        dishTypes: one.dishTypes
        });
        /* console.log({one}) */
    } catch (error){
        res.status(200).send ('El id de la receta no fue encontrado');
    }  

});

router.post('/', async (req, res) =>{
    
   try{ 
    const {
        name,
        summary,
        spoonacularScore,
        healthScore,
        steps,
        diets,
        createdInDb
    } = req.body
    console.log(diets, "ENTRA EN BODY")

    let newRecipe = await Recipe.create({
        
            name,
            summary,
            spoonacularScore,
            healthScore,
            steps,
            createdInDb
        });

    //busco las dietas
    let dbDiets = await Diet.findAll({
        where: { name: diets},
    });
        console.log(diets, "DIETS")
    //agrego la dieta de la nueva receta a la DB

    await newRecipe.addDiets(dbDiets)
    console.log(dbDiets, "DB DIETS")
    res.status(200).send("Receta creada con exito");

    } catch (err){
        console.log(err);
    }

});




module.exports = router;