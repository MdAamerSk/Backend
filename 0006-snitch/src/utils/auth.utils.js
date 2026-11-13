import jwt from "jsonwebtoken"
import config from "../config/config.js"

export function createAccessToken({ userId, role }) { //here userId and role are coming from the registerUser function in auth.controller.js
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
    return accessToken;
}

export function createRefreshToken({ userId, role }) {
    const refreshToken = jwt.sign({
        userId, role
    }, config.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
    return refreshToken;
}

export function readRefreshToken(refreshToken){
    return jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
}

export function readAccessToken(accessToken){
    return jwt.verify(accessToken,config.ACCESS_TOKEN_SECRET)
}