import express from "express";
import validateJWT from "../../middleware/validateJWT";
import validatePerms from "../../middleware/verifyPerm";
import listUsersController from "../../controllers/auth/listUsersController";
import getUsersController from "../../controllers/auth/getUserController";

    
const router = express.Router();

router.get("/auth",listUsersController)

export default router;