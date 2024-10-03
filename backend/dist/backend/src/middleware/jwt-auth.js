"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify JWT from cookies
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        console.log("no token");
        return res
            .status(401)
            .json({ message: "Authentication failed, no token provided" });
    }
    try {
        // Verify the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
        console.log("checking token");
        if (typeof decoded !== "string") {
            const payload = decoded; // Type casting to the correct interface
            req.user = payload; // Attach decoded token (user info) to the request object
        }
        next(); // Continue to the next middleware or route handler
    }
    catch (error) {
        console.log("token invalid");
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
}
