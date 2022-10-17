import {AppBar, styled, Toolbar} from "@mui/material";
import React from "react";

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between"
})

const NavBar = () => {
    return(
        <AppBar position="sticky">
            <StyledToolbar>Navbar</StyledToolbar>
        </AppBar>
    );
};
export default NavBar;