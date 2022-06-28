const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Diet, Recipe } = require("../db.js");

const { API_KEY } = process.env;
const { API_KEY1 } = process.env;
const { API_KEY2 } = process.env;
const { API_KEY3 } = process.env;
const { API_KEY4 } = process.env;
const { API_KEY5 } = process.env;
const { API_KEY6 } = process.env;
const { API_KEY7 } = process.env;
const { API_KEY8 } = process.env;
const { API_KEY9 } = process.env;
const { API_KEY10 } = process.env;
const { API_KEY11 } = process.env;
const { API_KEY12 } = process.env;
const { API_KEY13 } = process.env;
const { API_KEY14 } = process.env;
const { API_KEY15 } = process.env;
const { API_KEY16 } = process.env;
const { API_KEY17 } = process.env;
const { API_KEY18 } = process.env;

const getApiInfo = async () => {
  const apiKey = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY18}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiKey.data.results.map((e) => {
    return {
      title: e.title,
      id: e.id,
      summary: e.summary.replace(/<[^>]*>?/g, ""),
      steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
      healthScore: e.healthScore,
      spoonacularScore: e.spoonacularScore,
      image: e.image,
      diets: e.diets,
      dishTypes: e.dishTypes,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  let dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: {
        attributes: [],
      },
    },
  });

  return dbRecipes.map((e) => {
    return {
      title: e.title,
      id: e.id,
      summary: e.summary,
      steps: e.steps,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      diets: e.diets.map((e) => e.title),
      image: e.image,
      createdInDb: e.createdInDb,
    };
  });
};

const getAllRecipe = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/", async (req, res) => {
  const name = req.query.name;
  try {
    let recipeTotal = await getAllRecipe();
    if (name) {
      let recipeName = await recipeTotal.filter((t) =>
        t.title.toLowerCase().includes(name.toLowerCase())
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(404).send("there isnt any recipe");
    } else {
      res.status(200).send(recipeTotal);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in catch");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reciTotal = await getAllRecipe();
  // console.log(reciTotal);
  const recipeSummary = reciTotal.find((r) => r.id == id || r.title == id);

  if (recipeSummary) {
    res.json(recipeSummary);
  } else {
    res.status(404).send("esta mal");
  }
});

module.exports = router;
