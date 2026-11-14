import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { addToCartValidator } from "../validators/cart.validator.js"
import { addToCart, getCart } from "../controllers/cart.controller.js"

const router = express.Router()

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add an product to the user's cart
 */
// req.body = { productId,quantity,size}

router.post("/",authenticate,addToCartValidator,addToCart)

/**
 * @method GET
 * @route /api/cart
 * @access protected
 * @description Get the user's cart
 */
router.get("/",authenticate,getCart)


export default router