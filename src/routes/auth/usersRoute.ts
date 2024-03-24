import express from "express"

import listUsersController from "../../controllers/auth/listUsersController"
const Router = express.Router()

Router.get("/users",listUsersController)

export default Router 