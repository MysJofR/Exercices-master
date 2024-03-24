import express from "express";
import listExerciceController from "../../controllers/exercice/exerciceListAllController";
import verifyPerm from "../../middleware/verifyPerm"
const Router = express.Router();

Router.get("/list",verifyPerm,listExerciceController)

export default Router;