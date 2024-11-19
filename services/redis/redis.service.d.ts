import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private static client;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    set(key: string, value: any): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>;
    getClient(): RedisClientType;
}
