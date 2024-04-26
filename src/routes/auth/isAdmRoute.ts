import express from "express"

import isAdmController from "../../controllers/auth/isAdmController"
const Router = express.Router()

Router.get("/isAdmin",isAdmController)

export default Router 