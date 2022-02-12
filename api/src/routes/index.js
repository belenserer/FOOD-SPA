const { Router } = require('express');
const axios = require ('axios');
require('dotenv').config();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require ('./Recipes');
const diets = require ('./Diets');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/diets', diets);

module.exports = router;
