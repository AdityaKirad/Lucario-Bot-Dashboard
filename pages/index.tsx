import type { NextPage } from 'next';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import Head from 'next/head';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Wave from 'react-wavify';
import Navbar from '@components/Navbar';
import { LoginWindow } from "@components/NewWindow";
import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  const [popup, setPopup] = useState(false);
  const {data: session, status} = useSession();
  const router  = useRouter();
  if(status === 'authenticated') {
    router.push('/dashboard');
  };
  return (
    <React.Fragment>
      <Head>
        <title>Lucario-The Discord Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box className={styles.container}>
        <Navbar />
        <Box className={styles.mainContent}>
          <Box className={styles.description}>
            <Box className={styles.about}>
              <Typography className={styles.dashboard} variant='h3'>Lucario Bot Dashboard</Typography>
              <Typography className={styles.shortDescription} variant='h5'>A fully customizable server moderation Discord bot for
               your Discord server that features a simple and intuitive
                web dashboard. Server management just got a whole lot
                 easier.</Typography>
            </Box>
            <Box className={styles.buttons}>
              <Button className={styles.addToDiscord} variant='contained'>Add To Discord</Button>
              <Button className={styles.loginWithDiscord} variant='contained' onClick={() => setPopup(true)}>Login</Button>
              {popup && !session ? <LoginWindow url="/signinpage" onUnLoad={() => setPopup(false)} /> : null}
            </Box>
          </Box>
        </Box>
        <Wave className={styles.waves} fill='#0099FF' paused={false} options={{ height: 20, amplitude: 20, speed: 0.25, points: 3 }}/>  
      </Box>
    </React.Fragment>
  )
}

export default Home;
