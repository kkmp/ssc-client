import { AppBar, ListItem, styled, Toolbar, Typography, ListItemButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from '../img/Logo.png';
import { HealthAndSafety, AdminPanelSettings, Science } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import getTokenData from "../GetTokenData";
import ChangePasswordOnDemand from "./ChangePasswordOnDemand";
import Popup from "../Popup";
import { Fragment } from "react";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "grey"
})

const NavBar = (id) => {
  const [show, setShow] = useState(true)
  const [role, setRole] = useState("")
  const [buttonAddPopup, setButtonAddPopup] = useState(false)

  const handleLogout = () => {
    localStorage.clear();
    window.location = '/login'
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

  return (
    <Fragment>
      <AppBar position="sticky">
        <StyledToolbar>
          <img src={Logo} alt="logo" height={70} />
          <Typography variant="h6" textTransform={'uppercase'} sx={{ display: { xs: "none", sm: "block" } }}>
            Covid System
          </Typography>
          <div>

            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>

                  <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              variant="contained" {...bindTrigger(popupState)}
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
                    </Avatar> : null
              }
            </IconButton>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <ListItem>
                  <ListItemButton  href="/addPatient" >Dodaj pacjenta</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => setButtonAddPopup(true)} >Zmień hasło</ListItemButton>
                </ListItem>
                <ListItem>
                <ListItemButton onClick={handleLogout}>Wyloguj się</ListItemButton>
                </ListItem>
                  </Popover>
                </div>
              )}
            </PopupState>


          </div>

        </StyledToolbar>

      </AppBar>

      <Popup component={<ChangePasswordOnDemand id={id} />} trigger={buttonAddPopup} setTrigger={setButtonAddPopup} />

    </Fragment>
  );
};
export default NavBar;