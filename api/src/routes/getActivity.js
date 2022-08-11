const { Router } = require("express");
const router = Router();
const { Activity } = require("../db");

router.get("/", async (req, res) => {
  try {
    const activity = await Activity.findAll();
    // console.log(activity);
    activity.length
      ? res.status(200).send(activity)
      : res.send("no hay actividades");
  } catch (error) {
    res.status(404).send("error in catch Activity");
  }
});

module.exports = router;
