const mainRouter = require("express").Router();
const { monsterController } = require("../controllers/controllers.js");

mainRouter.get("/:string", monsterController);

module.exports = { mainRouter };
