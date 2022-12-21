import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { Box, Typography } from '@mui/material';
import {getToken} from 'next-auth/jwt';
import { unstable_getServerSession } from 'next-auth/next';
import {authOptions} from 'pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import DashboardNavbar from '@components/DashboardNavbar';
import GuildCard from '@components/GuildCard';
import styles from 'styles/Dashboard.module.css';
import getGuilds from '@utils/discord/guilds';

interface dashboardProps {
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

const Dashboard: NextPage<dashboardProps> = ({mutualGuilds,nonMutualGuilds}) => {
    const {data: session} = useSession()
    if(typeof window === 'undefined') return null
    if(!session) return null
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
                    <GuildCard mutualGuilds={mutualGuilds} nonMutualGuilds={nonMutualGuilds}/>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({req: context.req, secret})
    if(!session) return {redirect: {destination: '/', permanent: false}};
    const guilds = await getGuilds(token?.accessToken)
    const [mutualGuilds, nonMutualGuilds] = [guilds[0], guilds[1]]
    try {
        return {props: {session, mutualGuilds, nonMutualGuilds}}
    } catch(err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}
