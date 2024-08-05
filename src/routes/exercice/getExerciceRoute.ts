import express from "express";
import getExercice from "../../controllers/exercice/exerciceGetController";
import getExerciceByIdController from "../../controllers/exercice/exerciceByIdController";
const Router = express.Router();

Router.get("/:id",getExerciceByIdController)

export default Router;