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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const prisma_service_1 = require("../services/prisma.service");
const redis_service_1 = require("../services/redis/redis.service");
const users_service_1 = require("../users/users.service");
const hasing_1 = require("../utils/hasing");
const jwtUtil_1 = require("../utils/jwtUtil");
let AuthService = class AuthService {
    constructor(userService, redisService, prisma) {
        this.userService = userService;
        this.redisService = redisService;
        this.prisma = prisma;
    }
    async login(data) {
        const user = await this.userService.findByEmail(data.email);
        const isVerify = hasing_1.Hashing.verify(data.password, user.passwordHash);
        if (!user?.passwordHash || !isVerify) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { userId: user.id, email: user.email };
        const accessToken = jwtUtil_1.JWTUtil.generateAccessToken(payload);
        const refreshToken = jwtUtil_1.JWTUtil.generateRefreshToken();
        await this.redisService.set(`refreshToken_${refreshToken}`, JSON.stringify({ userId: user.id, email: user.email }));
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            expiresIn: config_1.JWT_ACCESS_EXPIRED,
        };
    }
    async getUserByField(key, value) {
        return this.prisma.user.findFirst({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
            where: {
                [key]: value,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        redis_service_1.RedisService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map