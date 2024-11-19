import { HttpStatus } from '@nestjs/common';
export declare class ResponseData<T> {
    data: T;
    message?: string;
    statusCode: HttpStatus;
    error?: string;
    status: boolean;
}
