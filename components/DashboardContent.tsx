import {NextPage} from 'next';
import Link from 'next/link';
import React, {useState} from 'react';
import {Box, Avatar,Typography,Divider,Button,Grid} from '@mui/material';
import {useSession, signOut} from 'next-auth/react';
import StyledSwicth from '@components/StyledSwitch';
import {ArrowDownSVG,ChatSVG,ShakingHandSVG,ReactionRolesSVG,ModerationSVG} from '@components/SVGComponents';
import styles from 'styles/MainDashboard.module.css';

const DashboardContent: NextPage = () => {
    const [dropdown, setDropdown] = useState(false);
    const [serverManagement, setServerManagement] = useState(false);
    const [checked, setChecked] = useState({
        welcome: false,
        reactionRoles: false,
        moderator: false
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
    };
    const {data: session, status} = useSession();
    const userImage = session?.user?.image;
    const openSupportServer = () => {
        window.open('https://discord.gg/bAEWnAxp2t','_blank')
    }
    return (
        <React.Fragment>
            <Box className={styles.dashboardContentContainer}>
                <Box sx={{display: 'flex', flexDirection: 'column', height: '10vh', justifyContent: 'center', alignItems: 'flex-end', padding: '1vh 1vw', background: '#1f2129'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => setDropdown(prevState => !prevState)}>
                        <Avatar alt="user-image" src={`${userImage}`}/>
                        <ArrowDownSVG className={dropdown ? styles.up : styles.down} styles={{height: '2.4rem', width: '2.4rem', color: '#bbb'}}/>
                    </Box>
                    <Box className={`${styles.dropdown} ${dropdown ? styles.active : ''}`} sx={{mt: '7vh'}}>
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
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                        <Box>
                            <Typography sx={{fontFamily: 'Arvo, Helvetica, serif', fontSize: '1.8rem'}}>Plugin Gallery</Typography>
                            <Typography sx={{fontFamily: 'Arvo, Helvetica, serif', fontSize: '1.4rem', color: 'grey'}}>Which plugin are we going to configure today?</Typography>
                        </Box>
                        <Button sx={{color: 'white', fontSize: '1.4rem', fontFamily: 'Arvo, Helevetica, serif', textTransform: 'none', background: '#1f2129', borderRadius: '12px', '&:hover': {background: '#1f2129'}}} disableRipple onClick={() => openSupportServer()}><ChatSVG styles={{height: '2.4rem', width: '2.4rem'}}/>Support Server</Button>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', padding: '3vh 3vw', background: '#1f2129', width: '90%', margin: '0 auto',gap: '2rem',borderRadius: '12px'}}>
                    <Button sx={{color: 'white', fontFamily: 'Arvo, Helvetica, serif', fontSize: '1.4rem', justifyContent: 'space-between', padding: 0, textTransform: 'none', '&:hover': {background: 'transparent'}}} onClick={() => setServerManagement(prevState => !prevState)} disableRipple>Server Management<ArrowDownSVG className={serverManagement ? styles.up : styles.down} styles={{width: '2.4rem', height: '2.4rem'}}/></Button>
                    <Divider sx={{borderColor: '#808080'}}/>
                    <Box className={serverManagement ? styles.open : styles.close}>
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={12}>
                                <Box className={styles.card}>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <ShakingHandSVG styles={{height: '2.4rem', width: '2.4rem', color: checked.welcome ? "#0099FF" : ""}}/>
                                        <StyledSwicth sx={{m: 1}} checked={checked.welcome} onChange={handleChange} name='welcome'/>
                                    </Box>
                                    <Typography className={styles.cardHeading}>Welcome</Typography>
                                    <Typography className={styles.cardSubHeading}>Give New Users A Warm Welcome</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Box className={styles.card}>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <ReactionRolesSVG styles={{height: '2.4rem', width: '2.4rem', color: checked.reactionRoles ? "#0099FF" : ""}}/>
                                        <StyledSwicth sx={{m: 1}} checked={checked.reactionRoles} onChange={handleChange} name='reactionRoles'/>
                                    </Box>
                                    <Typography className={styles.cardHeading}>Reaction Roles</Typography>
                                    <Typography className={styles.cardSubHeading}>Let Your Members Get Roles By Reacting To A Message</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Box className={styles.card}>
                                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <ModerationSVG styles={{height: '2.4rem', width: '2.4rem', color: checked.moderator ? "#0099FF" : ""}}/>
                                        <StyledSwicth sx={{m: 1}} checked={checked.moderator} onChange={handleChange} name='moderator'/>
                                    </Box>
                                    <Typography className={styles.cardHeading}>Moderator</Typography>
                                    <Typography className={styles.cardSubHeading}>Power Up Your Moderation With Cool Commands And Automations.</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default DashboardContent;