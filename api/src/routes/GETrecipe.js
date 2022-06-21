const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Diet, Recipe } = require("../db.js");

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
      spoonacularScore: e.spoonacularScore,
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

router.get("/", async (req, res) => {
  const title = req.query.title;
  try {
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
  } catch (error) {
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
