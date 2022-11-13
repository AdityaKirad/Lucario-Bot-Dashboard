namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        NEXTAUTH_URL: string
        NEXTAUTH_SECRET: string
        DISCORD_CLIENT_ID: string
        DISCORD_CLIENT_SECRET: string
        DISCORD_API_URL: string
        DISCORD_BOT_TOKEN: string
        DATABASE_URL: string
    }
}