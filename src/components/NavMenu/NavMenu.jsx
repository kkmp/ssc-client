import React, { useEffect, useState } from "react";
import getTokenData from "../GetTokenData";
import { Fragment } from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, ListItemAvatar} from "@mui/material";
import {Home, AdminPanelSettings, PersonAdd, PersonSearch, GroupAdd, Search, QueryStats, Help, Science, HealthAndSafety} from "@mui/icons-material";
import './style.css'

const NavMenu = () => {
    const [show, setShow] = useState(true)
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    useEffect(() => {
        var excetpions = ["login", "changePassword"];
        if (excetpions.indexOf(window.location.pathname.split('/')[1]) > -1) {
            setShow(false)
            return;
        }
        const data = getTokenData()
        if (data != null) {
            setName(data.name)
            setSurname(data.surname)
            setRole(data.role)
        }
    }, [])

    return (
        show ? 
        <Box className="navMenu"
                    flex={1}
                    p={2}
                    sx={{display:{xs: "none", sm: "block"}}}
                    minHeight="800px"
                    maxWidth='300px'
                    
                    >
           <List>                 
            <ListItem>
                <ListItemAvatar>
                
                    {role === "Administrator" ?
                    <Avatar>
                    <AdminPanelSettings />
                    </Avatar> : role === "Laborant" ?
                    <Avatar>
                    <Science />
                    </Avatar> : role === "Lekarz" ?
                    <Avatar>
                    <HealthAndSafety />
                    </Avatar>: null
                    }
                
                </ListItemAvatar>
                <ListItemText primary={name + " " + surname} secondary={role} />
            </ListItem>
            <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/">
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/addPatient">
                        <ListItemIcon>
                            <PersonAdd/>
                        </ListItemIcon>
                        <ListItemText primary="Dodaj pacjenta" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/searchPatient">
                        <ListItemIcon>
                            <PersonSearch/>
                        </ListItemIcon>
                        <ListItemText primary="Wyszukaj pacjenta" />
                    </ListItemButton>
                </ListItem>
                {role === "Laborant" ? null : (
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/analysis">
                        <ListItemIcon>
                            <QueryStats/>
                        </ListItemIcon>
                        <ListItemText primary="Analiza" />
                    </ListItemButton>
                </ListItem>
                )}
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/help">
                        <ListItemIcon>
                            <Help/>
                        </ListItemIcon>
                        <ListItemText primary="Pomoc" />
                    </ListItemButton>
                </ListItem>
                
                {role === "Administrator" ?
                    <Fragment>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/addUser">
                                <ListItemIcon>
                                    <GroupAdd/>
                                </ListItemIcon>
                                <ListItemText primary="Dodaj użytkownika" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/searchUser">
                                <ListItemIcon>
                                    <Search/>
                                </ListItemIcon>
                                <ListItemText primary="Wyszukaj użytkownika" />
                            </ListItemButton>
                        </ListItem>
                       
                    </Fragment> : null
                }
            
            </List>
           



        </Box>: null
    );
}

export default NavMenu