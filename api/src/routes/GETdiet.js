const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Diet } = require("../db.js");

const { API_KEY13 } = process.env;
const { API_KEY14 } = process.env;
const { API_KEY15 } = process.env;

router.get("/", async (req, res) => {
  const info = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY15}&addRecipeInformation=true&number=10`
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

module.exports = router;
