import express from "express";
import listExerciceController from "../../controllers/exercice/exerciceListAllController";
import verifyPerm from "../../middleware/verifyPerm"
const Router = express.Router();

Router.get("/"
    ,listExerciceController)

export default Router;