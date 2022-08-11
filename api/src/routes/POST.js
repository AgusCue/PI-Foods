const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db");

router.post("/", async (req, res) => {
  const { name, difficulties, duration, season, category, country } = req.body;
  if (!name || !difficulties || !duration || !season || !category || !country) {
    return res.status(404).send("falta campo");
  }
  try {
    let activityCreated = await Activity.create({
      name: name.slice(0, 1).toUpperCase() + name.slice(1, name.length),
      difficulties,
      duration,
      season,
      category,
    });

    country.forEach(async (e) => {
      let activityDB = await Country.findAll({
        where: { id: e },
      });
      await activityCreated.addCountry(activityDB);
    });

    return res.send("se creo");
  } catch (error) {
    res.status(404).send({ error: "error" });
  }
});

module.exports = router;
