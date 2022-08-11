const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require("./GETrecipe.js");
const dietRouter = require("./GETdiet");
const postRouter = require("./POST");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipe", recipeRouter);
router.use("/diet", dietRouter);
router.use("/recipes", postRouter);

module.exports = router;
