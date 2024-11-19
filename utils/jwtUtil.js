"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtil = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
class JWTUtil {
    static generateAccessToken(payload) {
        return jwt.sign(payload, config_1.JWT_SECRET, {
            expiresIn: config_1.JWT_ACCESS_EXPIRED,
        });
    }
    static generateRefreshToken() {
        const payload = {
            value: Math.random() * new Date().getTime(),
        };
        return jwt.sign(payload, config_1.JWT_SECRET, {
            expiresIn: config_1.JWT_REFRESH_EXPIRED,
        });
    }
    static verifyToken(token) {
        try {
            return jwt.verify(token, config_1.JWT_SECRET);
        }
        catch {
            return false;
        }
    }
}
exports.JWTUtil = JWTUtil;
//# sourceMappingURL=jwtUtil.js.map