import Link from 'next/link';
import React, { useState } from 'react';
import { IconButton, ListItemButton, SvgIcon, Drawer, List, ListItem, Divider, ListItemText, Collapse, ListItemIcon  } from '@mui/material';
import { Interests, KeyboardArrowDown } from '@mui/icons-material';
import { MdClose, MdConstruction, MdMilitaryTech } from 'react-icons/md';
import { BiCommand } from 'react-icons/bi';
import { useSession, signOut } from 'next-auth/react';
import {LoginWindow} from './NewWindow';
import styles from '../styles/Home.module.css';

const DrawerComponent = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [plugin, setPlugin] = useState(false);
    const [popup, setPopup] = useState(false);
    const { data: session, status } = useSession();
    const user = session?.user;
    const menuPluginHandler = () => {
        setOpenMenu(prevState => !prevState)
        if(plugin === true) return setPlugin(prevState => !prevState)
    };
    return (
        <React.Fragment>
            <IconButton aria-label='menu' onClick={() => setOpenMenu(true)}>
                <SvgIcon>
                <path d="M7.283 19H20m0-7H4m16-7h-7.028"stroke="#FFFFFF"strokeWidth="1.5"strokeLinecap="round"data-stroke="main" />
                </SvgIcon>
            </IconButton>
            <Drawer open={openMenu} anchor="right" onClose={() => menuPluginHandler()} PaperProps={{ sx: { backgroundColor: "#17181f99", width: "75%", backdropFilter: 'blur(1vw)'}}}>
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => menuPluginHandler()}>
                            <MdClose style={{ color: "#FFF", height: '24', width: '24' }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ color: "#FFF", border: "1px solid" }} />
                    <ListItem>
                        <ListItemButton onClick={() => setPlugin(prevState => !prevState)}>
                            <ListItemText primaryTypographyProps={{ style: { color: '#cb69c1', display: 'flex', fontFamily: 'Arvo, Helvetica, serif', alignItems: 'center' }}}>
                                Plugin<KeyboardArrowDown className={plugin ? styles.dropdownActive : styles.dropdownNotActive} style={{ height: '24', width: '24' }}/>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={plugin} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                <ListItemIcon>
                                    <MdConstruction style={{ color: "#cb69c1", width: '24', height: '24' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="#"><a  className={styles.collapseNavigationLink}>
                                        Moderation & Management
                                    </a></Link>
                                    <br />
                                    <Link href="#"><a  className={styles.collapseNavigationLinkDescription}>
                                        Welcome Plugin, Custom Commands, Reaction Roles, Moderator
                                    </a></Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Interests sx={{ color: "#cb69c1" }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="#"><a  className={styles.collapseNavigationLink}>
                                        Social Connecters
                                    </a></Link>
                                    <br />
                                    <Link href="#"><a  className={styles.collapseNavigationLinkDescription}>
                                        Twitch, Youtube, Twitter and Reddit Connection
                                    </a></Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <MdMilitaryTech style={{ color: "#cb69c1", height: '24', width: '24' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="#"><a  className={styles.collapseNavigationLink}>
                                        Engagement & Fun
                                    </a></Link>
                                    <br />
                                    <Link href="#"><a  className={styles.collapseNavigationLinkDescription}>
                                        Level, Birthdays, Music, Music Quiz And Economy Plugin
                                    </a></Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <BiCommand style={{ color: "#cb69c1", height: '24', width: '24' }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link href="#"><a  className={styles.collapseNavigationLink}>
                                        Utilities
                                    </a></Link>
                                    <br />
                                    <Link href="#"><a  className={styles.collapseNavigationLinkDescription}>
                                        Embeds, Search Anything, Record, Timers, Statistics, Temporary Channels
                                    </a></Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider sx={{ color: "#FFF", border: "1px solid" }} />
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>
                                <Link
                                    href='https://discord.com/api/oauth2/authorize?client_id=961965367767470171&permissions=8&scope=bot%20applications.commands'
                                    target='_blank'><a className={styles.collapseNavigationLink}>
                                    Invite
                                </a></Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText>
                                <Link
                                    href='https://discord.gg/bAEWnAxp2t'
                                    target='_blank'><a className={styles.collapseNavigationLink}>
                                    Support Server
                                </a></Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {!user ? (
                        <ListItem>
                            <ListItemButton onClick={() => setPopup(true)} sx={{ border: '0.1rem solid transparent', borderRadius: '0.2rem 20rem', background: '#0099ff'}}>
                                {popup && !session ? <LoginWindow url='/signinpage' onUnLoad={() => setPopup(false)} /> : null}
                                <ListItemText primaryTypographyProps={{ style: { fontFamily: "Macondo, cursive", color: "white", textAlign: 'center'}}}>Login</ListItemText>
                            </ListItemButton>
                        </ListItem> 
                        ) : (
                            <ListItem>
                                <ListItemButton onClick={() => signOut()} sx={{ border: '0.1rem solid transparent', borderRadius: '0.2rem 20rem', background: '#0099ff'}}>
                                    <ListItemText primaryTypographyProps={{ style: { fontFamily: "Macondo, cursive", color: "white", textAlign: 'center'}}}>Log Out</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                </List>
            </Drawer> 
        </React.Fragment>
    );
}

export default DrawerComponent;