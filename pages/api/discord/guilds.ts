import axios from "axios";
import { Prisma } from "../../../prisma/Prisma.server";

interface permissionsType {
    permissions: string;
}

interface guildType {
    id: string | null;
    name: string | null;
    icon: string | null;
    owner: boolean;
    permissions: string | null;
    features: [] | null;
}

async function getGuilds(id: string) {
    const botGuilds = axios.get(`${process.env.DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        },
    });

    const user = await Prisma.userswebinformation.findUnique({
        where: {
            discordId: Number(id)
        },
    });

    const accessToken = user?.accessToken;

    const userGuilds = axios.get(`${process.env.DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });

    return Promise.all([botGuilds, userGuilds])
}

export async function getGuildWithPermission(id: string) {
    const allGuilds = await getGuilds(id).catch((e) => {throw e});
    const {data: botGuilds} = allGuilds[0];
    const {data: userGuilds} = allGuilds[1];
    const permissionUserGuilds = userGuilds.filter(({permissions}: permissionsType) => (parseInt(permissions) & 0x20) === 0x20 || (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuilds = permissionUserGuilds.filter(
        (guild: guildType) => botGuilds.some(
            (botGuild: guildType) => botGuild.id === guild.id)
    );
    const nonMutualGuilds = permissionUserGuilds.filter(
        (guild: guildType) => {
            return mutualGuilds.findIndex((mutualGuild: guildType) => mutualGuild.id === guild.id) === -1;
        }
    );

    return [mutualGuilds, nonMutualGuilds]
}