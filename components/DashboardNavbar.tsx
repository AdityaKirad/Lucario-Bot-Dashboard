import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react';
import React, {useState} from 'react';
import {Box, AppBar, Avatar, Button, List, ListItem, useMediaQuery, createTheme, Typography, Divider} from '@mui/material';
import {ModerationSVG,EngagementSVG,SocialConnectersSVG,UtilitiesSVG,ArrowDownSVG} from './SVGComponents';
import DrawerComponent from "./DrawerComponent";
import styles from '../styles/Dashboard.module.css';

const DashboardNavbar = () => {
    const [plugin, setPlugin] = useState(false);
    const [avatarDropdown, setAvatarDropdown] = useState(false);
    const {data: session, status} = useSession();
    const userImage = session?.user?.image;
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
    })
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
    const pluginDropdownHandler = () => {
        if(avatarDropdown === true) setAvatarDropdown(prevState => false)
        setPlugin(prevState => !prevState)
    }
    const avatarDropdownHandler = () => {
        if(plugin === true) setPlugin(prevState => false)
        setAvatarDropdown(prevState => !prevState)
    }
    return (
        <React.Fragment>
            <Box className={styles.navigationBarWrapper}>
                <AppBar sx={{ display: 'flex', flexDirection: 'row', height: '10vh', justifyContent: 'space-between', bgcolor: 'transparent', boxShadow: 'none', position: 'relative'}} >
                    <Link href='#'>
                        <Box className={styles.logoShadow}>
                            <Avatar alt='Brand-Logo' src='/pokemon-journeys-mega-lucario-ash.jpg' sx={{boxShadow: '#60d1f6 0px 0px 88px'}} />
                            <a className={styles.brandName}>Lucario</a>
                        </Box>
                    </Link>
                    {isMatch ? (
                        <Box className={styles.drawerContainer} sx={{display: 'flex', margin: 'auto 2vw auto auto'}}>
                            <Avatar alt="user-image" src={`${userImage}`}/>
                            <DrawerComponent />
                        </Box>
                    ) : (
                        <Box className={styles.desktopNavgroup}>
                            <List sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <ListItem sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', position: 'relative', padding: 0, width: 'auto'}}>
                                    <Button className={styles.plugin} onClick={() => pluginDropdownHandler()} sx={{textTransform: 'none', padding: 0, '&:hover': {background: 'transparent'}}} disableRipple>Plugin<ArrowDownSVG className={plugin ? styles.dropdownActive : styles.dropdownNotActive} styles={{ color: "#bbb", width: 24, height: 24 }}/></Button>
                                    <Box className={`${styles.dropdown} ${plugin ? styles.active : ''}`} sx={{marginTop: '5vh'}}>
                                        <Box className={styles.dropdownContentWrapper}>
                                            <Box className={styles.dropdownContent}>
                                                <Box className={styles.dropdownContentIconsContainer}><ModerationSVG styles={{height: '2.4rem', width: '2.4rem', color: '#3994FF'}}/></Box>
                                                <Box className={styles.dropdownMainContent}>
                                                    <Link href='#'><a className={styles.dropdownContentHeadings}>Moderation & Management</a></Link>
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
                            </List>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => avatarDropdownHandler()}>
                                    <Avatar alt="user-image" src={`${userImage}`}/>
                                    <ArrowDownSVG className={avatarDropdown ? styles.dropdownActive : styles.dropdownNotActive} styles={{width: 24, height: 24, color: '#bbb'}}/>
                                    </Box>
                                <Box className={`${styles.avatarDropdown} ${avatarDropdown ? styles.active : ''}`} sx={{marginTop: '10vh'}}>
                                    <Box className={styles.dropdownContentWrapper}>
                                        <Typography sx={{fontSize: '1.6rem'}}>Lucario</Typography>
                                        <Typography sx={{color: 'grey', fontSize: '1.4rem'}}>Personal Rank Card</Typography>
                                        <Typography sx={{fontSize: '1.6rem'}}>Server Owners</Typography>
                                        <Link href='/dashboard'><a style={{color: 'grey', fontSize: '1.4rem'}}>My Servers</a></Link>
                                        <Divider sx={{borderColor: 'white', borderBottomWidth: 'initial'}}/>
                                        <Box onClick={() => signOut()} sx={{color: 'grey', fontSize: '1.4rem', cursor: 'pointer'}}>Sign Out</Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </AppBar>
            </Box>    
        </React.Fragment>
    );
}

export default DashboardNavbar;