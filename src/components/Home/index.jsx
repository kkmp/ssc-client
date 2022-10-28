import React, { useState, useEffect, Fragment } from "react";
import request from "../Request";
import jwt from "jwt-decode";
import Patient from "../Patient/Patient";
import UserDetails from "../User/UserDetails";

import {Box, Container, Typography} from "@mui/material";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Card } from "@mui/material";
import { People } from "@mui/icons-material";


export default function Home() {
    const [userData, setUserData] = useState([])
    const [addedPatients, setAddedPatients] = useState([])

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

    
    return (
        
            <Box bgcolor={'azure'} flex={5}>
                <Fragment>

                        <UserDetails data={userData} />
                        {/*<button onClick={handleOnClick}>Zmień hasło</button>*/}
                        <br></br>
                        
                        <Container>
                            <Typography variant="h6" marginBottom={"20px"}><People/> Ostatnio dodani pacjenci</Typography>
                            <TableContainer sx={{padding: '10px 10px 10px 10px', borderRadius: '16px', boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)"}} component={Paper} >
                                <Table aria-label="simple table">
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
                    
                        </Container>
                        
            </Fragment>
        </Box>
 
            
       
        
    );
};