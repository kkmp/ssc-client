import { Fragment, useState, useEffect } from "react"
import request from "../../Request"
import { Person } from "@mui/icons-material"
import Popup from "reactjs-popup"
import UserAvatar from "../../User/UserAvatar"
import EditTreatment from "./EditTreatment"
import Errors from "../../Errors"
import CustomPopup from "../../Popup"
import { Container, Typography, Box, Stack, Button } from "@mui/material"

const TreatmentDetails = (treatment) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/Treatment/showTreatmentDetails/' + treatment.id;
        const callback = (response) => {
            if (treatment.showEdit) {
                treatment.onSubmit()
            }
            var newDataArr = response.data;
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }

    const showCovidStatus = () => {
        switch (data.isCovid) {
            case true:
                return "Stwierdzono COVID"
            case false:
                return "Nie stwierdzono COVID"
            default:
                return "-"
        }
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
                                    Data rozpoczęcia
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {data.startDate}{" "}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Data zakończenia
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {data.endDate}
                                </Typography>
                            </Stack>
                        </Box>  
                        <Box>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Zachorowanie na COVID
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {showCovidStatus()}{" "}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                    {" "}
                                    Status
                                </Typography>
                                <Typography variant="body1" textAlign={"center"}>
                                    {" "}
                                    {data.treatmentStatus}{" "}
                                </Typography>
                            </Stack>
                            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                            <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                                {" "}
                                Dodano przez
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1.5 }} textAlign={"center"}>
                                {" "}
                                <Popup trigger={<Button><Person /></Button>} pinned position="bottom center">
                                    <UserAvatar data={data} />
                                </Popup>
                            </Typography>
                        </Stack>
                            
                        </Box>
                    </Stack>
                </Box>
                   
                {treatment.showEdit ? <Fragment>
                    
                    
                    <Box marginTop={3}>
                        <Button variant="outlined" onClick={() => setButtonPopup(true)}>Edytuj dane</Button>
                    </Box>
                </Fragment>
                    : null}
                <CustomPopup component={<EditTreatment id={treatment.id} data={data} onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
            </Container >
    );
}

export default TreatmentDetails