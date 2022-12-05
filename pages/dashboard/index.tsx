import type { NextPage, NextApiRequest } from 'next';
import { GetServerSideProps } from 'next';
import {getSession} from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { Box } from '@mui/system';
import DashboardNavbar from '@components/DashboardNavbar';
import GuildCard from '@components/GuildCard';
import styles from 'styles/Dashboard.module.css';
import { Typography } from '@mui/material';
import axios from 'axios';
import {getToken} from 'next-auth/jwt'

interface dashboardProps {
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
    nonMutualGuilds: Array<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: [];
    }>;
}

const DashboardHome: NextPage<dashboardProps> = ({session,mutualGuilds,nonMutualGuilds}) => {
    return (
        <React.Fragment>
            <Head>
                <title>Lucario-The Discord Bot</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Box className={styles.dashboardHomeContainer}>
                <DashboardNavbar />
                <Box className={styles.main}>
                    <Typography className={styles.selectServer}>Select A Server</Typography>
                    <GuildCard mutualGuilds={mutualGuilds} nonMutualGuilds={nonMutualGuilds} />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default DashboardHome;

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    const session = await getSession(context);
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({req: context.req, secret})
    const accessToken = token?.accessToken
    if(!session) return {redirect: {destination: '/', permanent: false}};
    try {
        const {data: guilds} = await axios.get(`https://lucariodashboard.netlify.app/api/discord/guilds/${accessToken}`)
        const [mutualGuilds, nonMutualGuilds] = [guilds[0], guilds[1]]
        return {props: {session, mutualGuilds, nonMutualGuilds}}
    } catch(err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}