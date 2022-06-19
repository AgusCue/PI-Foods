const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiKey = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
  );
  const apiInfo = await apiKey.data.results.map((e) => {
    return {
      title: e.title,
      id: e.id,
      summary: e.summary.replace(/<[^>]*>?/g, ""),
      steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets,
      dishTypes: e.dishTypes,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipe = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/recipe", async (req, res) => {
  const title = req.query.title;
  let recipeTotal = await getAllRecipe();
  if (title) {
    let recipeTitle = await recipeTotal.filter((t) =>
      t.title.toLowerCase().include(title.toLocaleLowerCase())
    );
    recipeTitle.length
      ? res.status(200).send(recipeTitle)
      : res.status(404).send("there isnt any recipe");
  } else {
    res.status(200).send(recipeTotal);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  const { diets, summary } = req.body;
});

module.exports = router;
