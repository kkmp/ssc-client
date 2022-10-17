import {AppBar, styled, ToolBar} from "@mui/material";
import React from "react";

const StyledToolbar = styled(ToolBar)({
    display:"flex",
    justifyContent:"space-between"
})

const NavBar = () => {
    return(
        <AppBar position="stick">
            <StyledToolbar>Navbar</StyledToolbar>
        </AppBar>
    );
};
export default NavBar;