import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found or deleted" });
    }

    // 4. Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default requireAuth;