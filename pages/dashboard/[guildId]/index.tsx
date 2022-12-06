import { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { NextPage } from 'next';
import React from 'react';
import { useSession } from 'next-auth/react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import {getToken} from 'next-auth/jwt'
import { Box } from '@mui/material';
import SideBar from '@components/SideBar';
import DashboardContent from '@components/DashboardContent';
import styles from 'styles/MainDashboard.module.css';
import getGuilds from '@utils/discord/guilds';

interface GuildBotFeaturesProps {
    mutualGuilds: Array<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: [];
    }>;
}

const GuildBotFeatures: NextPage<GuildBotFeaturesProps> = ({ mutualGuilds}) => {
    const {data: session} = useSession()
    if(typeof window === 'undefined') return null
    if(!session) return null
    return(
        <React.Fragment>
            <Head>
                <title>Lucario-The Discord Bot</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Box className={styles.background}>
                <SideBar mutualGuild={mutualGuilds}/>
                <DashboardContent />
            </Box>
        </React.Fragment>
    )
}

export default GuildBotFeatures

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({req: context.req, secret})
    if(!session) return {redirect: {destination: '/', permanent: false}};
    const guilds = await getGuilds(token?.accessToken)
    const mutualGuilds = guilds[0]
    try {
        return {props: {session, mutualGuilds}}
    } catch(err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}