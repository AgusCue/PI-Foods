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

router.get("/recipe", async (req, res) => {
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

router.get("/recipe/:id", async (req, res) => {
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

router.get("/diet", async (req, res) => {
  const info = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
  );
  const diet = info.data?.results.map((e) => e.diets);
  const newDiet = diet.flat().concat("vegetarian", "ketogenic");
  const allDiet = [...new Set(newDiet)];
  console.log(allDiet);
  for (let element in allDiet) {
    Diet.findOrCreate({
      where: { title: allDiet[element] },
    });
  }
  const totalDiet = await Diet.findAll();
  res.status(200).json(totalDiet);
});

router.post("/recipe", async (req, res) => {
  try {
    const {
      title,
      summary,
      steps,
      image,
      healthScore,
      spoonacularScore,
      diets,
    } = req.body;
    console.log(diets);
    const recipeCreated = await Recipe.create({
      title,
      summary,
      steps,
      image,
      healthScore,
      spoonacularScore,
    });

    diets.forEach(async (e) => {
      let dietDb = await Diet.findAll({
        where: { title: e },
      });
      await recipeCreated.addDiet(dietDb);
    });

    res.status(201).send("se agrego la recipe");
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
});

module.exports = router;
