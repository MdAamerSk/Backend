import {body, validationResult} from "express-validator"

export const registerValidator = [
    body("email")
    .exists().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body("phone")
    .exists().withMessage("Phone is required")
    .isMobilePhone("en-IN").withMessage("Invalid Phone Number"),
    body("password")
    .exists().withMessage("Password is required, received empty String")
    .trim()
    .isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()
            })
        }
        next()
    }
]