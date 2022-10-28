import {AppBar, ListItem, styled, Toolbar, Typography, ListItemButton} from "@mui/material";
import { grey } from "@mui/material/colors";
import { color, height  } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Logo from '../img/Logo.png';
import UserAvatar from "../User/UserAvatar";
import User from "../User/User";
import { HealthAndSafety, AdminPanelSettings, Science, AccountCircle} from "@mui/icons-material";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import AvatarMenu from '../AvatarMenu/AvatarMenu'
import getTokenData from "../GetTokenData";
import ChangePasswordOnDemand from "./ChangePasswordOnDemand";




const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    backgroundColor:"grey"
})

const StyledLogo = styled(Logo)({
    width:"50px",
    height:"50px"

})

const NavBar = () => {
    const [show, setShow] = useState(true)
    const [role, setRole] = useState("")
    const [anchorEl, setAnchorEl] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false)

    const handleOnClick = async (e) => {
      e.preventDefault()
      setShowChangePassword(!showChangePassword)
  }

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleMenu = () => {
      setAnchorEl(true);
    };
    

    useEffect(() => {
        var excetpions = ["login", "changePassword"];
        if (excetpions.indexOf(window.location.pathname.split('/')[1]) > -1) {
            setShow(false)
            return;
        }
        const data = getTokenData()
        if (data != null) {
            setRole(data.role)
        }
    }, [])

    return(
        
        <AppBar position="sticky">
            <StyledToolbar>
                <img src={Logo} alt="logo" height={70}/>
                <Typography variant="h6" textTransform={'uppercase'} sx={{display:{xs:"none", sm:"block"}}}>
                    Covid System
                </Typography>
                {/*<AvatarMenu/>* Menu lista po klikniecu w awatar na nabarze */}
                <div>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
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
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <ListItem>
                  <ListItemButton onClick={handleClose} href="/addPatient" >Dodaj pacjenta</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={handleOnClick} >{showChangePassword ? <ChangePasswordOnDemand onClose={handleOnClick} /> : ""}Zmień hasło</ListItemButton>
                </ListItem>
                <ListItem>
                  <MenuItem onClick={handleClose}  href="/Logout" >Wyloguj się</MenuItem> 
                </ListItem>
                
              </Menu>
            </div>
                
               
                
                
                
                
            </StyledToolbar>
        </AppBar>
    );
};
export default NavBar;