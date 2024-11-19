import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        email: string;
        passwordHash: string;
        role: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): string;
    findOne(id: number): string;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        email: string;
        passwordHash: string;
        role: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
