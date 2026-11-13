import express from "express"
import {registerValidator,loginValidator} from "../validators/auth.validator.js"
import {registerUser,loginUser,refresh,getMe} from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

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

/**
 * @GET /api/auth/me
 */

router.get("/me", authenticate, getMe)


export default router