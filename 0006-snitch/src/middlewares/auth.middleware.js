import { readAccessToken } from "../utils/auth.utils.js"

export function authenticate(req, res, next) {

    const accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({
            message: "Access not found in the req header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken);

        //const {userId,role} = decoded
        //req.user= {userId,role}

        req.user = decoded  // in this line in req obj we are creating a new user property

        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }

}
