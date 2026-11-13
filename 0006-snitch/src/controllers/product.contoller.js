import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"
export async function createProduct(req, res) {
    console.log(req.body)
    console.log(req.files)

    const fileUrls = []

    for (let i = 0; i < req.files.length; i++) {
        const response = await uploadFile({
            buffer: req.files[i].buffer,
            fileName: req.files[i].originalname
        })
        fileUrls.push(response.url)
    }
    console.log(fileUrls)

    const product = await productModel.create({
        title: req.body.title,
        description: req.body.description,
        price: {
            amount: req.body.price.amount,
            currency: req.body.price.currency
        },
        sizes: req.body.sizes,
        images: fileUrls,
        seller: req.user.userId
    })


    res.status(201).json({
        message: "Product created successfully",
        data: {
            product
        }
    })
}