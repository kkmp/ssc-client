import { Fragment } from "react"
import { Stack, Avatar, Grid, Paper, Box } from "@mui/material"; 
import {Science, AdminPanelSettings, HealthAndSafety} from "@mui/icons-material";
import { styled } from '@mui/material/styles';


const User = (user) => {
    const showRoleIcon = () => {
        switch (user.data.role) {
            case "Administrator":
                return <AdminPanelSettings />
            case "Lekarz":
                return <HealthAndSafety />
            case "Laborant":
                return <Science />
            default:
                break
        }
    }

    const showActivity = () => {
        if (user.data.isActive === true) {
            return "Aktywny"
        }
        return "Nieaktywny"
    }

    const handleAction = (id) => {
        window.location = '/user/' + id
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Fragment>
            <Stack direction="row">
                <Box sx={{width:'auto'}}>
                    <Grid container spacing={1}>
                        <Grid xs={4}>
                            <Item >
                                <Avatar sx={{ width: 56, height: 56 }}>{showRoleIcon()}</Avatar>

                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                <p>Imię: {user.data.name}</p>
                            </Item>
                            
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                <p>Nazwisko: {user.data.surname}</p>
                            </Item>
                        </Grid>
                    </Grid>
                  {user.data.email} {user.data.phone} {showActivity()}
                </Box>
                
                {user.showButton ? <button onClick={() => handleAction(user.data.id)}>Szczegóły</button> : ""}
            </Stack>
        </Fragment>
    );
}

export default User