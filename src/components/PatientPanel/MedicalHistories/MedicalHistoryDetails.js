import { Fragment, useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import CustomPopup from "../../Popup";
import UserAvatar from "../../User/UserAvatar";
import { Person } from "react-bootstrap-icons";
import EditMedicalHistory from "./EditMedicalHistory";
import Errors from "../../Errors";
import request from "../../Request";
import { styled, Paper, Container, Stack, Typography, Button } from "@mui/material";

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

    const Item = styled (Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "fbfbfbfb",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        borderRadius: "16px",
        maxHeight: "200px",
        display: "flex",
        boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)",
      }));

    return (
        error != null ? <Errors data={error} /> :
        <Container>
            <p>Co to</p>
            <Item>

                {data.date}  {data.description}
                <Popup trigger={<button><Person /></button>} pinned position="bottom center">
                    <UserAvatar data={data} />
                </Popup>
                <button onClick={() => setButtonPopup(true)}>Edytuj dane</button>
                <CustomPopup component={<EditMedicalHistory onSubmit={handleChange} id={medicalHistory.id} data={data}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
            </Item>
        </Container>
    );
}

export default MedicalHistoryDetails