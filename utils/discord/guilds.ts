import axios from 'axios';

interface guildType {
    id: string | null;
    name: string | null;
    icon: string | null;
    owner: boolean;
    permissions: string | null;
    features: [] | null;
}

interface permissionsType {
    permissions : string;
}

const getGuilds = async (token: string | undefined) => {
    const botGuild = axios.get('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    });
    const userGuild = axios.get('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const allGuilds = await  Promise.all([botGuild, userGuild]);
    const [{data: guild1}, {data: guild2}] = [allGuilds[0], allGuilds[1]];
    const permissionGuilds = guild2.filter(({permissions}: permissionsType) => (parseInt(permissions) & 0x20) === 0x20 || (parseInt(permissions) & 0x8) === 0x8);
    const mutualGuild = permissionGuilds.filter(
        (guild: guildType) => guild1.some(
            (botGuild: guildType) => botGuild.id === guild.id
        )
    );
    const nonMutualGuilds = permissionGuilds.filter(
        (guild: guildType) => {
            return mutualGuild.findIndex((mutualGuild: guildType) => mutualGuild.id === guild.id) === -1;
        }
    );
    return [mutualGuild, nonMutualGuilds]
}

export default getGuilds;