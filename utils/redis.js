"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
exports.redis = (0, redis_1.createClient)()
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
//# sourceMappingURL=redis.js.map