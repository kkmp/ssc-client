import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import request from "../Request";
import PatientDetails from "../Patient/PatientDetails";
import Tests from "./Tests";
import MedicalHistories from "./MedicalHistories";
import EditPatient from "./EditPatient";
import Treatments from "./Treatments";
import TreatmentDiseaseCourses from "./TreatmentDiseaseCourses";
import Errors from "../Errors";
import Popup from "../Popup";
import { Container, Box, Typography, Button } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import Patient from "../Patient/Patient";

const PatientPanel = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false)
    const { id } = useParams()

    const handleChange = async () => {
        const url = '/api/Patient/patientDetails/' + id;
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

    useEffect(() => {
        handleChange()
    }, []);

    return (
        error != null ? <Errors data={error} /> :
                data != null ?
                    <Fragment>
                        <Container>
                        <Box p={3}>
                            <Typography variant="h6">
                                <AccountBox /> Pacjent
                            </Typography>
                        </Box>
                            <Box p={3}>
                                <PatientDetails data={data} />
                            </Box>
                        
                        <Button variant='outlined' onClick={() => setButtonPopup(true)}>Edytuj dane</Button>
                        <Popup component={<EditPatient onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />

                        <Tests id={id} />
                        <MedicalHistories id={id} />
                        <Treatments id={id} />
                        <TreatmentDiseaseCourses id={id} />

                        </Container>
                        

                    </Fragment> :  <div className="spinner-border" role="status"></div>
                
    );
}

export default PatientPanel