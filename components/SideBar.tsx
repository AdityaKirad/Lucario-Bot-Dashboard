import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useState} from "react";
import {Box,Avatar,IconButton,Typography, Button} from "@mui/material";
import {ShakingHandSVG, UtilitiesSVG, EngagementSVG, SettingsSVG, ArrowDownSVG, BackSVG, MenuSVG, ModerationSVG,ReactionRolesSVG} from "@components/SVGComponents";
import styles from "styles/MainDashboard.module.css";

interface sidebarProps {
    mutualGuild: Array<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: [];
    }>;
}

const SideBar: NextPage<sidebarProps> = ({mutualGuild}) => {
    const [sidebar, setSidebar] = useState(false);
    const [guildSelect, setGuildSelect] = useState(false);
    const [serverManagement, setServerManagement] = useState(false);
    const router = useRouter();
    const { guildId } = router.query;
    return (
        <React.Fragment>
            <Box className={`${styles.sidebar} ${sidebar ? styles.collapse : ''}`}>
                <Box sx={{display: 'flex', height: '10vh', width : '100%', gap: '2%', justifyContent: 'center'}}>
                    {
                        sidebar ? (
                            <IconButton onClick={() => setSidebar(prevState => !prevState)} disableRipple>
                                <MenuSVG styles={{height: '2em', width: '2em'}}/>
                            </IconButton>
                        ) : (
                            <>
                                <IconButton onClick={() => setSidebar(prevState => !prevState)} disableRipple>
                                    <BackSVG styles={{height: '2em', width: '2em'}}/>
                                </IconButton>
                                <Link href='#'>
                                    <Box className={styles.logoShadow}>
                                        <Avatar alt='Brand-Logo' src='/pokemon-journeys-mega-lucario-ash.jpg' />
                                        <a className={styles.brandName}>Lucario</a>
                                    </Box>
                                </Link>
                            </>
                        )
                    }
                </Box>
                <Box className={styles.guildSelect}  onClick={() => setGuildSelect(prevState => !prevState)}>
                    {
                        sidebar ? (
                            <>
                                {mutualGuild.map((item, index) => {
                                    if(item.id === guildId) return (
                                        <Box sx={{display: 'flex', alignItems: 'center', margin: 'auto', gap: '1rem'}} key={index}>
                                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40, width: 40, border: '1px solid white', borderRadius: 12}}>
                                                <Typography className={styles.guildSelectContent}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {mutualGuild.map((item, index) => {
                                    if(item.id === guildId) return (
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1vw'}}  key={index}>
                                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40, width: 40, border: '1px solid white', borderRadius: 12}}>
                                                <Typography key={index} className={styles.guildSelectContent}>{item.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()}</Typography>
                                            </Box>
                                            <Typography className={styles.guildSelectContent}>{item.name}</Typography>
                                        </Box>
                                    )
                                })}
                                <ArrowDownSVG className={guildSelect ? styles.up : styles.down} styles={{width: '2rem', height: '2rem', marginRight: '1vw'}}/>
                            </>
                        )
                    }
                </Box>
                <Box className={styles.commonSettings}>
                    {
                        sidebar ? (
                            <>
                                <Link href="#"><a><Box className={styles.commonSettingsContent} sx={{justifyContent: 'center'}}><UtilitiesSVG styles={{height: '2.4rem', width: '2.4rem'}}/></Box></a></Link>
                                <Link href="#"><a><Box className={styles.commonSettingsContent} sx={{justifyContent: 'center'}}><EngagementSVG styles={{height: '2.4rem', width: '2.4rem', fill: 'none'}}/></Box></a></Link>
                                <Link href="#"><a><Box className={styles.commonSettingsContent} sx={{justifyContent: 'center'}}><SettingsSVG styles={{height: '2.4rem', width: '2.4rem'}}/></Box></a></Link>
                            </>
                        ) : (
                            <>
                                <Link href="#"><a><Box className={styles.commonSettingsContent}><UtilitiesSVG styles={{height: '2.4rem', width: '2.4rem'}}/>Dashboard</Box></a></Link>
                                <Link href="#"><a><Box className={styles.commonSettingsContent}><EngagementSVG styles={{height: '2.4rem', width: '2.4rem', fill: 'none'}}/>Leaderboard</Box></a></Link>
                                <Link href="#"><a><Box className={styles.commonSettingsContent}><SettingsSVG styles={{height: '2.4rem', width: '2.4rem', '&:hover': {color: 'white'}}}/>Settings</Box></a></Link>
                            </>
                        )
                    }
                </Box>
                <Box className={styles.serverManagement}>
                    {
                        sidebar ? (
                            <>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures} sx={{justifyContent: 'center'}}>
                                    <ShakingHandSVG styles={{width: '2.4rem', height: '2.4rem'}}/>
                                </Box></a></Link>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures} sx={{justifyContent: 'center'}}>
                                    <ReactionRolesSVG styles={{width: '2.4rem', height: '2.4rem'}} />
                                </Box></a></Link>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures} sx={{justifyContent: 'center'}}>
                                    <ModerationSVG styles={{width: '2.4rem', height: '2.4rem'}} />
                                </Box></a></Link>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setServerManagement(prevState => !prevState)} disableRipple sx={{display: 'flex', justifyContent: 'space-between', fontFamily: 'Arvo, Helvetica, serif', fontSize: '1.2rem', color: 'grey', padding: '0 0 3vh 0', '&:hover' : {background: 'transparent', color: 'white'}}}>Server Management<ArrowDownSVG className={serverManagement ? styles.up : styles.down}/></Button>
                                <Box className={`${styles.serverManagementContent} ${serverManagement ? styles.active : ""}`}>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures}>
                                    <ShakingHandSVG styles={{width: '2.4rem', height: '2.4rem', '&:hover': {color: 'white'}}}/>
                                    Welcome
                                </Box></a></Link>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures}>
                                    <ReactionRolesSVG styles={{width: '2.4rem', height: '2.4rem', '&:hover': {color: 'white'}}} />
                                    Reaction Roles
                                </Box></a></Link>
                                <Link href='#'><a><Box className={styles.serverManagementFeatures}>
                                    <ModerationSVG styles={{width: '2.4rem', height: '2.4rem'}} />
                                    Moderator
                                </Box></a></Link>
                                </Box>
                            </>
                        )
                    }
                    
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default SideBar;