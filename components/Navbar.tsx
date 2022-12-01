import {useSession} from 'next-auth/react'
import Link from 'next/link';
import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, List, ListItem, useMediaQuery, createTheme } from '@mui/material';
import {ModerationSVG, EngagementSVG, SocialConnectersSVG, UtilitiesSVG, DiscordSVG,ArrowDownSVG} from '@components/SVGComponents';
import {LoginWindow} from '@components/NewWindow';
import styles from 'styles/Home.module.css';

const Navbar = () => {
    const {data: session, status} = useSession()
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        }
    });
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
    const [plugin, setPlugin] = useState(false);
    const [popup, setPopup] = useState(false);
    return (
        <React.Fragment>
        <Box className={styles.navigationBarWrapper}>
        <AppBar sx={{ display: 'flex', flexDirection: 'row', height: '10vh', justifyContent: 'space-between',bgcolor: 'transparent', boxShadow: 'none'}} >
            <Link href='#'>
                <Box className={styles.logoShadow}>
                    <Avatar alt='Brand-Logo' src='/pokemon-journeys-mega-lucario-ash.jpg' sx={{boxShadow: '#60d1f6 0px 0px 88px'}} />
                    <a className={styles.brandName}>Lucario</a>
                </Box>
            </Link>
            { isMatch ? (
                <Box sx={{margin: 'auto 2vw auto auto'}}>
                    <Button variant='contained' className={styles.login} onClick={() => setPopup(prevState => true)}>Login</Button>
                    {popup && !session ? <LoginWindow url='/signinpage' onUnLoad={() => setPopup(prevState => false)} /> : null}
                </Box> 
            )
             : (
                <Box className={styles.desktopNavGroup}>
                    <List sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <ListItem sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', position: 'relative', padding: 0, width: 'auto'}}>
                            <Button className={styles.plugin} onClick={() => setPlugin(prevState => !prevState)} sx={{textTransform: 'none', padding: 0, '&:hover': {background: 'transparent'}}} disableRipple>Plugin<ArrowDownSVG className={plugin ? styles.dropdownActive : styles.dropdownNotActive} styles={{ color: "#9195AB", width: 24, height: 24 }}/></Button>
                            <Box className={`${styles.dropdown} ${plugin ? styles.active : ''}`}>
                                <Box className={styles.dropdownContentWrapper}>
                                    <Box className={styles.dropdownContent}>
                                        <Box className={styles.dropdownContentIconsContainer}><ModerationSVG styles={{height: '2.4rem', width: '2.4rem', color: '#3994FF'}}/></Box>
                                        <Box className={styles.dropdownMainContent}>
                                            <Link href='#'><a  className={styles.dropdownContentHeadings}>Moderation & Management</a></Link>
                                            <Link href='#'><a className={styles.dropdownContentHeadingParts}>Welcome Plugin, Custom Commands, Reaction Roles, Moderator</a></Link>
                                        </Box>
                                    </Box>
                                    <Box className={styles.dropdownContent}>
                                        <Box className={styles.dropdownContentIconsContainer}><SocialConnectersSVG styles={{height: '2.4rem', width: '2.4rem', color: '#3994FF', fill: 'none'}}/></Box>
                                        <Box className={styles.dropdownMainContent}>
                                            <Link href='#'><a className={styles.dropdownContentHeadings}>Social Connecters</a></Link>
                                            <Link href='#'><a className={styles.dropdownContentHeadingParts}>Twitch, Youtube, Twitter and Reddit Connection</a></Link> 
                                        </Box>
                                    </Box>
                                    <Box className={styles.dropdownContent}>
                                        <Box className={styles.dropdownContentIconsContainer}><EngagementSVG styles={{height: '2.4rem', width: '2.4rem', color: '#3994FF', fill: 'none'}}/></Box>
                                        <Box className={styles.dropdownMainContent}>
                                            <Link href='#'><a  className={styles.dropdownContentHeadings}>Engagement & Fun</a></Link>
                                            <Link href='#'><a  className={styles.dropdownContentHeadingParts}>Level, Birthdays, Music, Music Quiz And Economy Plugin</a></Link> 
                                        </Box>
                                    </Box>
                                    <Box className={styles.dropdownContent}>
                                        <Box className={styles.dropdownContentIconsContainer}><UtilitiesSVG styles={{height: '2.4rem', width: '2.4rem', color: '#3994FF'}}/></Box>
                                        <Box className={styles.dropdownMainContent}>
                                            <Link href='#'><a  className={styles.dropdownContentHeadings}>Utilities</a></Link>
                                            <Link href='#'><a  className={styles.dropdownContentHeadingParts}>Embeds, Search Anything, Record, Timers, Statistics, Temporary Channels</a></Link> 
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </ListItem>
                    <Box><Link href='#'><a  className={styles.navLinks}>Invite</a></ Link></Box>
                    <Box><Link href='#'><a  className={styles.navLinks}>Support Server</a></ Link></Box>
                    <Box><Button variant='contained' className={styles.login} onClick={() => setPopup(prevState => true)}>Login<DiscordSVG styles={{height: '2em', width: '2em', color: '#FFF'}}/></Button></Box>
                    {popup && !session ? <LoginWindow url='/signinpage' onUnLoad={() => setPopup(prevState => false)} /> : null}
                    </List>
                </Box>
            )}             
        </AppBar>
        </Box>
        </React.Fragment>
    );
}

export default Navbar;