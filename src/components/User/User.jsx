import { Fragment } from "react"
import { Stack, Avatar, Box, Paper, Chip, Container, Typography, Button} from "@mui/material"; 
import {Science, AdminPanelSettings, HealthAndSafety} from "@mui/icons-material";
import { styled } from '@mui/material/styles';



const User = (user) => {
    const showRoleIcon = () => {
        switch (user.data.role) {
            case "Administrator":
                return <AdminPanelSettings/>
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
            return <Chip label="Aktywny" color="success" Height={'35px'}/>
        }
        return <Chip label="Nieaktywny" color="error" />
    }

    const handleAction = (id) => {
        window.location = '/user/' + id
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'fbfbfbfb',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '16px',
        maxHeight: '200px',
        display:"flex",
        boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)",
      }));

    return (
        
        <Fragment>
            <Container>
                <Item>
                    <Stack direction={'row'} spacing={{ xs: 2, sm: 4, md: 5 }}>
                        <Box>
                            <Avatar sx={{ width: 56, height: 56, margin:"10px" }} > {showRoleIcon()} </Avatar>
                        </Box>
                        <Box>
                            <Stack direction={'column'} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }} >
                                <Typography variant="body1" sx={{mt:1.5}} textAlign={'center'} > {user.data.name} {user.data.surname} </Typography>
                                <Typography variant="body2"> {user.data.role}</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Stack direction={'column'} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }} >
                                <Typography variant="body2" sx={{mt:1.5}} textAlign={'center'} > Email </Typography>
                                <Typography variant="body1"> {user.data.email} </Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Stack direction={'column'} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }} >
                                <Typography variant="body2" sx={{mt:1.5}} textAlign={'center'} > Telefon </Typography>
                                <Typography variant="body1"> {user.data.phoneNumber} </Typography>
                            </Stack>
                        </Box>
                        
                        
                        <Box paddingTop={2.5}>
                            {showActivity()}
                        </Box>
                        <Box paddingTop={2.5}>
                            {user.showButton ? <Button variant="outlined" onClick={() => handleAction(user.data.id)}>Szczegóły</Button> : ""}
                        </Box>
                        
                    </Stack>
                   
                </Item>
                    

            </Container>
        </Fragment>
    );
}

export default User