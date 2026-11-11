import { registerUser } from "../controllers/auth.controller.js"
import express from "express"
import { registerValidator } from "../validators/auth.validator.js"

const router = express.Router()

router.post("/register", registerValidator, registerUser)

export default router