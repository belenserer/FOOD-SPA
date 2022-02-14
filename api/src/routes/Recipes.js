const { Router } = require ('express');
const axios = require ('axios');
const { Recipe, Diet } = require ('../db');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
require('dotenv').config();
const {API_KEY2} = process.env
const router = Router();


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`);
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
        dishTypes: el.dishTypes,
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
    const dbInfo = await getDbInfo();
    
    const apiInfo = await getApiInfo();
      /* console.log("after getApiInfo") */
      
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
    let allRecipes = await getAllRecipes();
    //axios.get(
        //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`);
    let one = await allRecipes.find(el => (el.id.toString()) === (idRecipe))
    
   console.log({one})
    //let steps = one.createdInDb ? one.steps : one.steps.map((s)=> s.steps.map((el) => el.step))
    
    //console.log(steps, "STEPS")

    res.json({
        id: one.id,
        name: one.name,
        summary: one.summary,
        spoonacularScore: one.spoonacularScore,
        healthScore: one.healthScore,
        steps: one.steps,
        image: one.image,
        diets: one.diets.map((e) => { return {name: e.name}}),
        dishTypes: one.dishTypes,
        createdInDb: one.createdInDb
        });
        /* console.log({one}) */
    } catch (error){
        console.log(error)
        res.status(200).send ('El id de la receta no fue encontrado');
    }  

});

router.post('/', async (req, res) =>{
    
   try{ 
    const {
        name,
        summary,
        dishTypes,
        spoonacularScore,
        healthScore,
        steps,
        diets,
        createdInDb
    } = req.body
    /* console.log(diets, "ENTRA EN BODY") */

    let newRecipe = await Recipe.create({
        
            name,
            summary,
            dishTypes,
            spoonacularScore,
            healthScore,
            steps,
            createdInDb
        });

    //busco las dietas
    let dbDiets = await Diet.findAll({
        where: { name: diets},
    });
        /* console.log(diets, "DIETS") */

    //agrego la dieta de la nueva receta a la DB

    await newRecipe.addDiets(dbDiets)
    //console.log(dbDiets, "DB DIETS")
    res.status(200).send("Receta creada con exito");

    } catch (err){
        console.log(err);
    }

});




module.exports = router;