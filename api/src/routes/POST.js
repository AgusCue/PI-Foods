const { Router } = require("express");
const router = Router();
const { Diet, Recipe } = require("../db.js");

router.post("/", async (req, res) => {
  const { title, summary, steps, image, healthScore, spoonacularScore, diets } =
    req.body;
  try {
    console.log(diets);
    let recipeCreated = await Recipe.create({
      title: title.slice(0, 1).toUpperCase() + title.slice(1, title.length),
      summary,
      steps,
      image,
      healthScore,
      spoonacularScore,
    });
    console.log(recipeCreated);
    diets.forEach(async (e) => {
      let dietDb = await Diet.findAll({
        where: { title: e },
      });
      console.log(dietDb);
      await recipeCreated.addDiet(dietDb);
    });

    res.send("fue creado");
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
});

module.exports = router;
