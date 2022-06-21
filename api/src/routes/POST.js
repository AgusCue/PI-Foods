const { Router } = require("express");
const router = Router();
const { Diet, Recipe } = require("../db.js");

router.post("/", async (req, res) => {
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
