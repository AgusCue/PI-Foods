const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Diet } = require("../db.js");

const { API_KEY } = process.env;
const { API_KEY_2 } = process.env;
const { API_KEY_3 } = process.env;
const { API_KEY_4 } = process.env;
const { API_KEY_5 } = process.env;
const { API_KEY_6 } = process.env;
const { API_KEY_7 } = process.env;
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
const { API_KEY19 } = process.env;
const { API_KEY20 } = process.env;

router.get("/", async (req, res) => {
  try {
    const apiKey = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_3}&addRecipeInformation=true`
    );

    const diet = apiKey.data?.results.map((e) => e.diets);
    // console.log(diet);
    let newDiet = diet.flat().concat("vegetarian", "ketogenic");
    const allDiet = [...new Set(newDiet)];
    // console.log(allDiet);
    let totalDiet = [];
    while (totalDiet.length < 11) {
      for (let element in allDiet) {
        Diet.findOrCreate({
          where: { title: allDiet[element] },
        });
      }
      totalDiet = await Diet.findAll();
    }

    console.log(totalDiet);

    res.status(200).json(totalDiet);
  } catch (error) {
    res.send("soy un error");
  }
});

module.exports = router;
