import { body, validationResult } from "express-validator"

export const registerValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .trim()
        .isEmail().withMessage("Invalid email"),
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters long"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()
            });
        }
        next();
    }
];

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a string").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be atleast 6 character long"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Data",
                errors: errors.array()
            })
        }
        next();
    }
]


//express-validator consists of two parts: validation chain and validation result. Validation chain is used to validate the request body, query, params, headers, cookies, etc. Validation result is used to check if there are any validation errors. If there are any validation errors, it will return a 400 status code with the error message. If there are no validation errors, it will call the next middleware function.