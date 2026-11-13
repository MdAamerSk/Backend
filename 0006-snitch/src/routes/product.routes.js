import { Router } from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { createProduct } from "../controllers/product.contoller.js"
import multer, { memoryStorage } from "multer"
import { createProductValidator } from "../validators/product.validator.js"
const router = Router()

const upload = multer({
    storage: memoryStorage(),
    limits: {
        files: 5,
        fileSize: 1 * 1024 * 1024 // 1MB
    },
})

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 * req.body=>{title,description:price:{amount,currency},sizes:[{size,stock},{si–ze,stock}]}
 */

router.post("/",
    // –––––––––––––– check is user authenticate ––––––––––––––––––––
    authenticate,
    // –––––––––––––– check the role is seller or not ––––––––––––––––––––
    (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "user is not authorize to create products"
        })
    }
    next()
    },
     // –––––––––––––– required for reading the data from req.body if the formate is form-data(multipart-form-data) ––––––––––––––––––––
    upload.array("images"), //note: The frontend form (field name/FormData) key should match the string "images".
    // –––––––––––––– Parse complex data (objects/arrays) coming from the frontend as strings ––––––––––––––––––––
    (req, res, next) => {
        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))
        next()
    },
    createProductValidator,
    createProduct)

    

export default router

