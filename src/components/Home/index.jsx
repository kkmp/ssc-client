import React, { useState, useEffect, Fragment } from "react";
import request from "../Request";
import jwt from "jwt-decode";
import Patient from "../Patient/Patient";
import UserDetails from "../User/UserDetails";
import ChangePasswordOnDemand from "./ChangePasswordOnDemand";
import {Box, Container, Typography} from "@mui/material";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";


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
                    <Typography variant="h6">Mój profil</Typography>

                        <UserDetails data={userData} />
                        <button onClick={handleOnClick}>Zmień hasło</button>
                        <br></br>
                        {showChangePassword ? <ChangePasswordOnDemand onClose={handleOnClick} /> : ""}
                        
                        <Typography variant="h6">Ostatnio dodani pacjenci</Typography>
                        <br></br>
                        <TableContainer sx={{"padding": '10px 10px 10px 10px'}} component={Paper}>
                            <Table aria-label="simple table" sx={{ '*': {textAlign: 'center'}}}>
                                <TableHead sx={{ 'th': {fontWeight: 'bold'}}}>
                                    <TableCell>PŁEĆ</TableCell>
                                    <TableCell>IMIĘ</TableCell>
                                    <TableCell>NAZWISKO</TableCell>
                                    <TableCell>PESEL</TableCell>
                                    <TableCell>DATA URODZENIA</TableCell>
                                    <TableCell>AKCJA</TableCell>

                                </TableHead>
                                <TableBody>
                                    
                                        {addedPatients.map((patient) =>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                                                <Patient key={patient["id"]} data={patient} />
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    
            </Fragment>
        </Box>
 
            
       
        
    );
};