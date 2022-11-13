import React, {useState} from 'react';
import type { NextPage } from 'next';
import Image from "next/future/image";
import { useRouter } from 'next/router';
import { Grid, Box, Typography, Button } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { InviteWindow } from './NewWindow';
import styles from '../styles/Dashboard.module.css';

interface guildProps {
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

const GuildCard: NextPage<guildProps> = ({ mutualGuilds, nonMutualGuilds }) => {
    const router = useRouter()
    const [popup, setPopup] = useState(false);
    const [guildId, setGuildId] = useState('');
    const openPopout = (guild_id: string) => {
        setPopup(true)
        setGuildId(guild_id)
    }
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 300,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        }
    })
    const moveToMainDashboard = (guild_id: string) => {
        router.push(`/dashboard/${guild_id}`)
    } 
    return (
        <React.Fragment>
            <Grid container spacing={8} sx={{marginTop: '1vh'}}>
                {
                    mutualGuilds.map((item, index) => {
                        if(item.owner === true){
                            if(item.icon === null || item.icon === ''){
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary}>
                                                <Typography className={styles.serverNameInitial}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Owner</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem' }} onClick={() => moveToMainDashboard(item.id)}>Go</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary} sx={{position: 'relative', overflow: 'hidden', background: 'none !important'}}>
                                                <Box sx={{position: 'absolute', inset: '0px', zIndex: 1, transform: 'scale(1.4)', filter: 'blur(10px)', opacity: 0.3, background: `url(https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png) center center / cover`}}></Box>
                                                <Image alt='guild-icon' src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`} className={styles.guildImage} height={80} width={80}/>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Owner</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem' }} onClick={() => moveToMainDashboard(item.id)}>Go</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            }
                        } else {
                            if(item.icon === null || item.icon === ''){
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary}>
                                                <Typography className={styles.serverNameInitial}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Bot Master</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem' }} onClick={() => moveToMainDashboard(item.id)}>Go</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary} sx={{position: 'relative', overflow: 'hidden',background: 'none !important'}}>
                                                <Box sx={{position: 'absolute', inset: '0px', zIndex: 1, transform: 'scale(1.4)', filter: 'blur(10px)', opacity: 0.3, background: `url(https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png) center center / cover`}}></Box>
                                                <Image alt='guild-icon' src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`} className={styles.guildImage} height={80} width={80}/>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Bot Master</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem' }} onClick={() => moveToMainDashboard(item.id)}>Go</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            }
                        }
                    })
                }

                {
                    nonMutualGuilds.map((item, index) => {
                        if(item.owner === true){
                            if(item.icon === null || item.icon === ''){
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary}>
                                                <Typography className={styles.serverNameInitial}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Owner</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem', background: '#FFFFFF1A', '&:hover': {background: '#FFFFFF3A'}}} onClick={() => openPopout(item.id)}>Setup</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary} sx={{position: 'relative', overflow: 'hidden',background: 'none !important'}}>
                                                <Box sx={{position: 'absolute', inset: '0px', zIndex: 1, transform: 'scale(1.4)', filter: 'blur(10px)', opacity: 0.3, background: `url(https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png) center center / cover`}}></Box>
                                                <Image alt='guild-icon' src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`} className={styles.guildImage} height={80} width={80}/>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Owner</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem', background: '#FFFFFF1A', '&:hover': {background: '#FFFFFF3A'}}} onClick={() => openPopout(item.id)}>Setup</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            }
                        } else {
                            if(item.icon === null || item.icon === ''){
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary}>
                                                <Typography className={styles.serverNameInitial}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Bot Master</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem', background: '#FFFFFF1A', '&:hover': {background: '#FFFFFF3A'}}} onClick={() => openPopout(item.id)}>Setup</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item md={4} sm={6} xs={12} key={index}>
                                        <Box className={styles.guildCard}>
                                            <Box className={styles.guildCardPrimary} sx={{position: 'relative', overflow: 'hidden', background: 'none !important'}}>
                                                <Box sx={{position: 'absolute', inset: '0px', zIndex: 1, transform: 'scale(1.4)', filter: 'blur(10px)', opacity: 0.3, background: `url(https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png) center center / cover`}}></Box>
                                                <Image alt='guild-icon' src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`} className={styles.guildImage} height={80} width={80}/>
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'row', padding: '0', alignItems: 'center', marginTop: '1vh'}}>
                                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                    <Typography className={styles.serverName}>{item.name}</Typography>
                                                    <Typography className={styles.serverRole}>Bot Master</Typography>
                                                </Box>
                                                <Button variant='contained' sx={{ fontFamily: 'Arvo, Helvetica,serif', marginLeft: 'auto', fontSize: '1.6rem', background: '#FFFFFF1A', '&:hover': {background: '#FFFFFF3A'}}} onClick={() => openPopout(item.id)}>Setup</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            }
                        }
                    })
                }
            </Grid>
            {popup ? <InviteWindow url= {`https://discord.com/api/oauth2/authorize?client_id=961965367767470171&guild_id=${guildId}&disable_guild_select=true&permissions=8&scope=bot%20applications.commands&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard`} guildId={`${guildId}`} onUnLoad={() => setPopup(false)}/> : null}
        </React.Fragment>
    )
}

export default GuildCard