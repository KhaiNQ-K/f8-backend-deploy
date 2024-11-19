export declare class JWTUtil {
    static generateAccessToken(payload: any): string;
    static generateRefreshToken(): string;
    static verifyToken(token: string): any;
}
