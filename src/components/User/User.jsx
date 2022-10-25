import { Fragment } from "react"
import { Stack, Avatar, Grid, Paper, Box, Card, Container} from "@mui/material"; 
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
                <Container>
                <Stack direction={'row'}>
                    <Item>
                        <Avatar sx={{ width: 56, height: 56 }}>{showRoleIcon()}</Avatar>
                    </Item>
                    <Item>
                        <p>Imię: {user.data.name}</p>
                        <p>Nazwisko: {user.data.surname}</p>
                    </Item>
                    <Item>
                        {user.data.email} 
                        {user.data.phone}
                    </Item>
                    <Item>
                    {showActivity()}
                    </Item>
                    
           
                    {user.showButton ? <button onClick={() => handleAction(user.data.id)}>Szczegóły</button> : ""}

                  
                
            </Stack>
            </Container>
            
            
        </Fragment>
    );
}

export default User