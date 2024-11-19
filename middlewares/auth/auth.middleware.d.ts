import { NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RedisService } from 'src/services/redis/redis.service';
export declare class AuthMiddleware implements NestMiddleware {
    private authService;
    private redisService;
    constructor(authService: AuthService, redisService: RedisService);
    use(req: any, res: any, next: () => void): Promise<any>;
}
