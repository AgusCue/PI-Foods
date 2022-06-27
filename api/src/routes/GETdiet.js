const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Diet } = require("../db.js");

const { API_KEY } = process.env;
const { API_KEY1 } = process.env;
const { API_KEY2 } = process.env;
const { API_KEY3 } = process.env;
const { API_KEY4 } = process.env;
const { API_KEY5 } = process.env;
const { API_KEY7 } = process.env;
const { API_KEY8 } = process.env;
const { API_KEY9 } = process.env;
const { API_KEY10 } = process.env;
const { API_KEY11 } = process.env;
const { API_KEY12 } = process.env;

router.get("/", async (req, res) => {
  const info = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY12}&addRecipeInformation=true&number=10`
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
