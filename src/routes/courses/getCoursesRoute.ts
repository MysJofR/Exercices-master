import express from "express";
import validateJWT from "../../middleware/validateJWT";
import validatePerms from "../../middleware/verifyPerm";
import listUsersController from "../../controllers/auth/listUsersController";
import getUsersController from "../../controllers/auth/getUserController";
import getCourses from "../../controllers/courses/getCoursesController";

    
const router = express.Router();

router.get("/courses",validateJWT, validatePerms ,getCourses)

export default router;