import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"

export async function createProduct(req, res) {
    console.log(req.body)
    console.log(req.files)

    try{

       // 1. Create an array of upload promises for all files and start uploading them ALL AT ONCE in the background
        const uploadPromises = req.files.map(file => 
            uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
        );

        // 2.Pause the function right here and wait until ALL uploads are finished
        const uploadResponses = await Promise.all(uploadPromises);
        
        // 3. Extract the URLs from the responses
        const fileUrls = uploadResponses.map(response => response.url);
        console.log(fileUrls);

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
        });

        res.status(201).json({
            message: "Product created successfully",
            data: {
                product
            }
        });

    }catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ 
            message: "Failed to create product", 
            error: error.message 
        });
    }
}

export async function listAllProducts(req, res) {

    const products = await productModel.find({ published: true })

    res.status(200).json({
        message: "Products data fetched successfully",
        data: {
            products
        }
    })
}

export async function listAllProductsToSeller(req,res){
    
    const allProducts = await productModel.find({})

     return res.status(200).json({
        message: "All products fetched successfully",
        data: {
            products
        }
    })
}

export async function unlistProduct(req,res) {

    const {id} = req.params

    const product = await findById(id)

    if (!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    // –––––––––––––––––– make product unPublished –––––––––––––––––––––

    const unlistedProduct = await productModel.findByIdAndUpdate(id,{
        published:false
    })
    
    return res.status(200).json({
        message: "Product unpublished successfully",
        data : unlistedProduct
    })

}

export async function listProduct(req,res) {

    const {id} = req.params

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "product not found by id"
        })
    }

    // –––––––––––––––––– make product Published –––––––––––––––––––––
    const listedProduct = await productModel.findByIdAndUpdate(id,{
        published:true
    })

     return res.status(200).json({
        message: "Product published successfully",
        data:listedProduct
    })

}