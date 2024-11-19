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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        if (!RedisService_1.client) {
            RedisService_1.client = (0, redis_1.createClient)({
                url: 'redis://localhost:6379',
            });
            RedisService_1.client.on('error', (err) => {
                console.error('Redis error:', err);
            });
        }
    }
    async onModuleInit() {
        if (!RedisService_1.client.isOpen) {
            await RedisService_1.client.connect();
            console.log('Connected to Redis');
        }
    }
    async onModuleDestroy() {
        if (RedisService_1.client.isOpen) {
            await RedisService_1.client.disconnect();
        }
    }
    async set(key, value) {
        await RedisService_1.client.set(key, JSON.stringify(value));
    }
    async get(key) {
        return RedisService_1.client.get(key);
    }
    async del(key) {
        return RedisService_1.client.del(key);
    }
    getClient() {
        return RedisService_1.client;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map