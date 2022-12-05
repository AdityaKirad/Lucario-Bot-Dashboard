import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import {Box, Typography, Button} from '@mui/material';
import Wave from 'react-wavify';
import styles from 'styles/Error.module.css';

const Custom404: NextPage = () => {
    const router = useRouter();
    const goBack = () => {
        router.push('/')
    }
    return (
        <React.Fragment>
            <Head>
                <title>404: This Page Could Not Be Found</title>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            </Head>
            <Box className={styles.container}>
                <Box className={styles.content}>
                    <Typography component='p' className={styles.p404}>404</Typography>
                    <Typography component='p' className={styles.errorDesc}>Uh oh! Looks like you got lost.</Typography>
                    <Typography component='p' className={styles.errorDesc}>Go back to the homepage if you dare!</Typography>
                    <Button variant="contained" className={styles.goBack} onClick={() => goBack()}>i Dare!</Button>
                </Box>
                <Box>
                <Wave className={styles.waves} fill='#0099FF' paused={false} options={{ height: 20, amplitude: 20, speed: 0.25, points: 3 }}/>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Custom404;