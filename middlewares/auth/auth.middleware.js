"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const redis_service_1 = require("../../services/redis/redis.service");
const jwtUtil_1 = require("../../utils/jwtUtil");
let AuthMiddleware = class AuthMiddleware {
    constructor(authService, redisService) {
        this.authService = authService;
        this.redisService = redisService;
    }
    async use(req, res, next) {
        const token = req.headers.authorization?.split(' ').slice(-1).join();
        console.log('authorization', req.headers.authorization);
        const decode = jwtUtil_1.JWTUtil.verifyToken(token);
        const isBlackList = await this.redisService.get(`blacklist_${token}`);
        if (!decode || isBlackList) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: 'Unauthorized',
            });
        }
        const user = await this.authService.getUserByField('id', decode.userId);
        req.user = user;
        req.token = token;
        next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        redis_service_1.RedisService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map