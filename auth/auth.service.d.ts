import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis/redis.service';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth.login';
export declare class AuthService {
    private userService;
    private redisService;
    private prisma;
    constructor(userService: UsersService, redisService: RedisService, prisma: PrismaService);
    login(data: AuthLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        expiresIn: string;
    }>;
    getUserByField(key: string, value: string): Promise<{
        name: string;
        email: string;
        role: string;
        id: number;
    }>;
}
