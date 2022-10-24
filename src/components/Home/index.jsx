import React, { useState, useEffect, Fragment } from "react";
import request from "../Request";
import jwt from "jwt-decode";
import Patient from "../Patient/Patient";
import UserDetails from "../User/UserDetails";
import ChangePasswordOnDemand from "./ChangePasswordOnDemand";
import {Box, Container} from "@mui/material";

export default function Home() {
    const [userData, setUserData] = useState([])
    const [addedPatients, setAddedPatients] = useState([])
    const [showChangePassword, setShowChangePassword] = useState(false)

    useEffect(() => {
        const handleChange = async () => {
            const tokenRead = localStorage.getItem("token");
            if (tokenRead == null || tokenRead === '') {
                window.location = '/login'
            }
            const decoded = jwt(tokenRead);
            const urlUser = '/api/User/userDetails/' + decoded["nameid"];
            const callbackUser = (response) => {
                setUserData(response.data)
            }
            await request({ url: urlUser, type: "GET" }, callbackUser);

            const urlAddedPatients = "/api/Patient/recentlyAddedPatients";
            const callbackurlAddedPatients = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setAddedPatients(newDataArr)
            }
            await request({ url: urlAddedPatients, type: "GET" }, callbackurlAddedPatients);
        }
        handleChange()
    }, []);

    const handleOnClick = async (e) => {
        e.preventDefault()
        setShowChangePassword(!showChangePassword)
    }

    return (
            <Box bgcolor={"pink"} flex={5}>
                <Fragment>
                    
                    <div className="product-container">
                        Tymczasowe wyświetlanie:
                        <br></br>
                        Twoje dane:
                        <UserDetails data={userData} />
                        <button onClick={handleOnClick}>Zmień hasło</button>
                        <br></br>
                        Ostatnio dodani pacjenci:
                        {addedPatients.map((patient) => <Patient key={patient["id"]} data={patient} />)}
                        {showChangePassword ? <ChangePasswordOnDemand onClose={handleOnClick} /> : ""}
                    </div>
            </Fragment>
        </Box>
            
       
        
    );
};