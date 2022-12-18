import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import request from "../Request";
import UserDetails from "../User/UserDetails";
import Errors from "../Errors";
import getTokenData from "../GetTokenData";
import EditUser from "./EditUser";
import { Box , Button, Typography, Container} from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import Popup from "../Popup";

const UserPanel = () => {
    const [data, setData] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false)
    const [error, setError] = useState(null);
    const [changed, setChanged] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        const handleChange = async () => {
            const url = '/api/User/userDetails/' + id;
            const callback = (response) => {
                var newDataArr = response.data;
                setData(newDataArr)
                setError(null)
            }
            const errorCallback = (response) => {
                setError(response.data)
            }
            await request({ url: url, type: "GET" }, callback, errorCallback);
        }
        handleChange()
    }, [changed]);

    const changeActivity = async () => {
        var activity = null
        if (data.isActive) {
            activity = "deactivate"
        } else {
            activity = "activate"
        }
        const url = '/api/User/changeActivity/' + activity + '/' + id;

        const callback = () => {
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "PUT" }, callback, errorCallback);
        setChanged(!changed)
    }

    const handleChange = (event, newValue) => {
        setChanged(!changed);
      };

    return (
        error != null ? <Box p={3}><Errors data={error} /></Box> :
            <Container>
                <Box bgcolor={"azure"} flex={5}>
                    <Fragment>
                        <Box p={3}>
                        <Typography variant="h6" marginBottom={"20px"}>
                            <AccountBox/> Użytkownik
                        </Typography>
                        </Box>
                       
                
                <UserDetails data={data} />

                    <Box p={3} display={'flex'} justifyContent={'center'}>
                        <Button sx={{'marginRight':'20px'}} variant='outlined' onClick={() => setButtonPopup(true)}>Edytuj dane</Button>

                        <Button sx={{'marginLeft':'20px'}} variant='outlined' disabled={getTokenData().id === id} onClick={changeActivity}>{data.isActive ? "Dezaktywuj konto" : "Aktywuj konto"}</Button>
                        
                    </Box>
                    <Popup component={<EditUser data={data} onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
                
            </Fragment>
            </Box>
            </Container>
    );
}

export default UserPanel