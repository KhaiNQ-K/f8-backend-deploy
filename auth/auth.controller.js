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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../services/redis/redis.service");
const response_data_dto_1 = require("../utils/base-dto/response-data.dto");
const jwtUtil_1 = require("../utils/jwtUtil");
const auth_service_1 = require("./auth.service");
const auth_login_1 = require("./dto/auth.login");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
let AuthController = class AuthController {
    constructor(authService, redisService, userService) {
        this.authService = authService;
        this.redisService = redisService;
        this.userService = userService;
    }
    async login(body, res) {
        const response = new response_data_dto_1.ResponseData();
        response.status = false;
        response.statusCode = common_1.HttpStatus.BAD_REQUEST;
        response.error = 'Email hoặc mật khẩu không chính xác';
        if (!body.email || !body.password) {
            return res.status(response.statusCode).json(response);
        }
        try {
            const data = await this.authService.login(body);
            response.data = data;
            response.statusCode = common_1.HttpStatus.OK;
            response.status = true;
            response.message = 'Login successfully';
            response.error = '';
            return res.status(response.statusCode).json(response);
        }
        catch {
            return res.status(response.statusCode).json(response);
        }
    }
    getProfile(req, res) {
        console.log('get profile');
        res.status(common_1.HttpStatus.OK).json({
            success: true,
            data: req.user,
            message: 'Get profile success',
        });
    }
    async logout(req) {
        const token = req.token;
        await this.redisService.set(`blacklist_${token}`, 1);
    }
    async refreshToken(req, body, res) {
        try {
            const refresh_token = body.refreshToken;
            jwtUtil_1.JWTUtil.verifyToken(refresh_token);
            const { email, userId } = JSON.parse(await this.redisService.get(`refreshToken_${refresh_token}`));
            const accessToken = jwtUtil_1.JWTUtil.generateAccessToken({ userId, email });
            const refreshToken = jwtUtil_1.JWTUtil.generateRefreshToken();
            await this.redisService.set(`refreshToken_${refreshToken}`, JSON.stringify({ userId, email }));
            return {
                access_token: accessToken,
                refreshToken,
            };
        }
        catch {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                error: 'Unauthorized',
            });
        }
    }
    async register(body, res) {
        const existEmail = await this.authService.getUserByField('email', body.email);
        if (existEmail) {
            return res.status(common_1.HttpStatus.CONFLICT).json({
                success: false,
                error: 'Email đã tồn tại',
            });
        }
        await this.userService.create(body);
        return res.status(common_1.HttpStatus.OK).json({
            success: true,
            message: 'Đăng ký thành công',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refreshToken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        redis_service_1.RedisService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map