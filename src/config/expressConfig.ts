import 'express-async-errors';

import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../swagger.json";

import path from "path";

import cors from "cors";

import exerciceRoutes from "../routes/exercice/index";
import authRoutes from "../routes/auth/index";
import listMember from "../routes/courses/getCoursesRoute"
import verifyPerm from "../middleware/verifyPerm"
import errorHandler from "../Errors/errorHandler";
import validateJWT from '../middleware/validateJWT';
import isAdminRoute from '../routes/auth/isAdmRoute';
import usersRoute from '../routes/auth/usersRoute';
import listUsers from '../routes/auth/listUsersRoute';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function expressConfig(): Express {
    const app = express();
    //Configure to use JSON and URLENCODED
    app.use(cors(
        {
            origin: '*'
        }
    ));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Configure routes


    const storagePath = path.resolve(__dirname, 'src', 'storage');

app.use('/storage', express.static(storagePath));

  
    app.use("/auth", authRoutes.signUpRoute)
    app.use("/auth", authRoutes.loginRoute)
    app.use("/auth", authRoutes.checkTokenRoute)    
 
    
    app.use(validateJWT)
    app.use("/auth", isAdminRoute)
    app.use("/list", listUsers)
    app.use(verifyPerm)
    app.use("/me", usersRoute)
    app.use("/", listMember)
    app.use("/exercice", exerciceRoutes.updateExerciceRoute)
    app.use("/exercice", exerciceRoutes.addExerciceRoute)
    app.use("/exercice", exerciceRoutes.submitExerciceRoute)
    app.use("/exercice", exerciceRoutes.getExerciceRoute)
    app.use("/exercice", exerciceRoutes.deleteExerciceRoute)
    app.use("/exercice", exerciceRoutes.listExerciceRoute)

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
   
    

    app.use(errorHandler);

    return app
}