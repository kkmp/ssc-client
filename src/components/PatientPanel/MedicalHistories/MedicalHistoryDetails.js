import { useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import CustomPopup from "../../Popup";
import UserAvatar from "../../User/UserAvatar";
import { Person } from "@mui/icons-material";
import EditMedicalHistory from "./EditMedicalHistory";
import Errors from "../../Errors";
import request from "../../Request";
import { Container, Stack, Typography, Button, Box } from "@mui/material";

const MedicalHistoryDetails = (medicalHistory) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/MedicalHistory/showMedicalHistoryDetails/' + medicalHistory.id;
        const callback = (response) => {
            medicalHistory.onSubmit()
            var newDataArr = response.data
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }



    return (
        error != null ? <Errors data={error} /> :
        <Container>
            
            
            <Box marginTop={2}>
                    <Stack direction={"row"} spacing={{ xs: 4, sm: 5, md:10}}>
                        <Box>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Data dodania
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {data.date}{" "}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Dodano przez
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    <Popup trigger={<Button variant="text"><Person /></Button>} pinned position="bottom center">
                                        <UserAvatar data={data} />
                                    </Popup>
                                </Typography>
                            </Stack>
                        </Box>  
                    
                    
                    
                        <Box>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Opis
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {data.description}{" "}
                                </Typography>
                            </Stack>
                            
                        </Box>
                    </Stack>
                </Box>

                  
                <Box marginTop={3}>
                    <Button variant="outlined" onClick={() => setButtonPopup(true)}>Edytuj dane</Button>
                </Box>
                
                <CustomPopup component={<EditMedicalHistory onSubmit={handleChange} id={medicalHistory.id} data={data}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
        
        </Container>
    );
}

export default MedicalHistoryDetails