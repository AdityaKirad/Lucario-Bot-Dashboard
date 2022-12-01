import axios from "axios";
import type { NextApiRequest,NextApiResponse } from 'next';

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


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    const {token}  = req.query
    if (token) {
        const botGuild = axios.get('https://discord.com/api/v10/users/@me/guilds',{
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
            },
        });
        const userGuild = axios.get('https://discord.com/api/v10/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const allGuilds = await Promise.all([botGuild, userGuild]);
        const [{data: guild1}, {data: guild2}] = [allGuilds[0], allGuilds[1]];
        const permissionUserGuilds = guild2.filter(({permissions}: permissionsType) => (parseInt(permissions) & 0x20) === 0x20 || (parseInt(permissions) & 0x8) === 0x8);
        const mutualGuilds = permissionUserGuilds.filter(
            (guild: guildType) => guild1.some(
                (botGuild: guildType) => botGuild.id === guild.id)
        );
        const nonMutualGuilds = permissionUserGuilds.filter(
            (guild: guildType) => {
                return mutualGuilds.findIndex((mutualGuild: guildType) => mutualGuild.id === guild.id) === -1;
            }
        );
        res.status(200).send([mutualGuilds, nonMutualGuilds]);
    } else {
        res.status(401).send('Unauthorized');
    }
}