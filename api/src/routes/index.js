const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const postRouter = require("./Post");
const activitiesRouter = require("./getActivity");
const countryRouter = require("./getCountry");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/activities", activitiesRouter);
router.use("/activity", postRouter);
router.use("/countries", countryRouter);

module.exports = router;
