import { Response } from 'express';
import { RedisService } from 'src/services/redis/redis.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private authService;
    private redisService;
    private userService;
    constructor(authService: AuthService, redisService: RedisService, userService: UsersService);
    login(body: AuthLoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any, res: Response): void;
    logout(req: any): Promise<void>;
    refreshToken(req: any, body: any, res: Response): Promise<Response<any, Record<string, any>> | {
        access_token: string;
        refreshToken: string;
    }>;
    register(body: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
