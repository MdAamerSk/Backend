import express from "express"
import {registerValidator,loginValidator} from "../validators/auth.validator.js"
import {registerUser,loginUser,refresh} from "../controllers/auth.controller.js"

const router = express.Router()

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = { email,name,password }
 * @response res.status = 201 (if successful)
 */

router.post("/register", registerValidator, registerUser)

/**
 * @POST /api/auth/login
 * @param req
 * @param req.body = {email,password}
 * res.status = 200
 */

router.post("/login", loginValidator ,loginUser)

/**
 * @POST /api/auth/refresh
 */
router.post('/refresh', refresh)


export default router