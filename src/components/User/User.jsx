import { Fragment } from "react"
import { Stack, Avatar, Box, Paper, Chip, Card, Container, Typography} from "@mui/material"; 
import {Science, AdminPanelSettings, HealthAndSafety, AccountBox, ColorizeOutlined} from "@mui/icons-material";
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
        marginTop:'20px',
        display:"flex",
        boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)",
      }));

    return (
        <Fragment>
            <Container>
                <Typography variant="h6" >
                    <AccountBox/> Mój profil
                </Typography>
                <Item>
                    <Stack direction={'row'} spacing={{ xs: 2, sm: 3, md: 5 }}>
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
                                <Typography variant="body1"> {user.data.phone} </Typography>
                            </Stack>
                        </Box>
                        
                        {/* 
                        <Stack direction={'column'} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }} display="flex" marginTop={2} >
                        <Typography variant="body2" sx={{mt:1.5}} textAlign={'center'} > Status </Typography>

                            {showActivity()}
                        </Stack>
                        */}
                        
                        {
                           user.data.role === "Administrator" ?
                           <Box>
                                <Stack direction={'column'} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }} >
                                    <Typography variant="body2" sx={{mt:1.5}} textAlign={'center'} > Utworzono </Typography>
                                    <Typography variant="body1">{user.data.date}</Typography> 
                                </Stack>
                           </Box>:null
                           
                        }
                        <Box paddingTop={2.5}>
                            {showActivity()}
                        </Box>
                        
                    </Stack>
                   
                </Item>
                    {user.showButton ? <button onClick={() => handleAction(user.data.id)}>Szczegółyyyy</button> : ""}

            </Container>
        </Fragment>
    );
}

export default User