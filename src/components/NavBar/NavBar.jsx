import {AppBar, styled, Toolbar, Typography} from "@mui/material";
import { grey } from "@mui/material/colors";
import { color, height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Logo from '../img/Logo.png';
import UserAvatar from "../User/UserAvatar";
import User from "../User/User";
import { HealthAndSafety, AdminPanelSettings, Science } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import AvatarMenu from '../AvatarMenu/AvatarMenu'

import getTokenData from "../GetTokenData";

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
                <Typography variant="h6" sx={{display:{xs:"none", sm:"block"}}}>
                    Covid System
                </Typography>
                {/*<AvatarMenu/>* Menu lista po klikniecu w awatar na nabarze */}
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
               
                
                
                
                
            </StyledToolbar>
        </AppBar>
    );
};
export default NavBar;