import { JWT } from "next-auth/jwt";
import NextAuth, {NextAuthOptions} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const DISCORD_AUTHORIZATION_URL: string = "https://discord.com/api/oauth2/authorize" + 
    new URLSearchParams({
        prompt: "consent",
        access_type: "offline",
        response_type : "code"
    });

async function refreshAccessToken(token: JWT) {
    try {
        const url = "https://discord.com/api/oauth2/token" +
            new URLSearchParams({
                clientId: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if(!response.ok) { 
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch ( error ) {
        console.log( error );

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            token: "https://discord.com/api/oauth2/token",
            userinfo: "https://discord.com/api/users/@me",
            authorization: {
                params: {
                    scope: 'identify email guilds applications.commands.permissions.update'
                },
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            if( account && user ) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + (account.expires_at || 0) * 1000,
                    refreshToken: account.refresh_token,
                    user,
                } as JWT;
            }

            if( Date.now() < token.accessTokenExpires ) {
                return token;
            }
            return refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },

    session: {
        strategy:"jwt",
        maxAge: 60*60*24*2
    },

    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)