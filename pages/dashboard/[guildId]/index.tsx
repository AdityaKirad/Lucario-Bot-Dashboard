import { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getSession } from 'next-auth/react';
import { Box } from '@mui/material';
import axios from 'axios';
import {getToken} from 'next-auth/jwt'
import SideBar from '@components/SideBar';
import DashboardContent from '@components/DashboardContent';
import styles from 'styles/MainDashboard.module.css';

interface GuildBotFeaturesProps {
    session: {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        }
        expires: string;
    };
    mutualGuilds: Array<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: [];
    }>;
}

const GuildBotFeatures: NextPage<GuildBotFeaturesProps> = ({session, mutualGuilds}) => {
    const router = useRouter();
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
    const session = await getSession(context);
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({req: context.req, secret})
    const accessToken = token?.accessToken
    if(!session) return {redirect: {destination: '/', permanent: false}};
    try {
        const {data: guilds} = await axios.get(`https://lucariodashboard.netlify.app/api/discord/guilds/${accessToken}`)
        const mutualGuilds = guilds[0]
        return {props: {session, mutualGuilds}}
    } catch(err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}