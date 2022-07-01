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
const { API_KEY19 } = process.env;

// router.get("/", async (req, res) => {
//   const info = await axios.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY14}&addRecipeInformation=true&number=100`
//   );
//   const diet = info.data?.results.map((e) => e.diets);
//   // console.log(diet);
//   let newDiet = diet.flat().concat("vegetarian", "ketogenic");
//   const allDiet = [...new Set(newDiet)];
//   // console.log(allDiet);
//   for (let element in allDiet) {
//     Diet.findOrCreate({
//       where: { title: allDiet[element] },
//     });
//   }
//   const totalDiet = await Diet.findAll();
//   console.log(totalDiet);
//   if (totalDiet.length === 11) {
//     res.status(200).json(totalDiet);
//   } else {
//     return  ;
//   }
// });

router.get("/", async (req, res) => {
  const info = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY14}&addRecipeInformation=true&number=100`
  );
  const diet = info.data?.results.map((e) => e.diets);
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
});

module.exports = router;
