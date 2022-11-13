import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        accessTokenExpires: number;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
        iat: number;
        exp: number;
        jti: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        accessTokenExpires: number;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        };
        iat: number;
        exp: number;
        jti: string;
    }
}

export {};