import React, { useState, useEffect, Fragment } from "react";
import request from "../Request";
import jwt from "jwt-decode";
import Patient from "../Patient/Patient";
import UserDetails from "../User/UserDetails";
import { Box, Container, Typography } from "@mui/material";
import { People, AccountBox } from "@mui/icons-material";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [addedPatients, setAddedPatients] = useState([]);

  useEffect(() => {
    const handleChange = async () => {
      const tokenRead = localStorage.getItem("token");
      if (tokenRead == null || tokenRead === "") {
        window.location = "/login";
      }
      const decoded = jwt(tokenRead);
      const urlUser = "/api/User/userDetails/" + decoded["nameid"];
      const callbackUser = (response) => {
        setUserData(response.data);
      };
      await request({ url: urlUser, type: "GET" }, callbackUser);

      const urlAddedPatients = "/api/Patient/recentlyAddedPatients";
      const callbackurlAddedPatients = (response) => {
        var newDataArr = Object.keys(response.data).map(
          (key) => response.data[key]
        );
        setAddedPatients(newDataArr);
      };
      await request(
        { url: urlAddedPatients, type: "GET" },
        callbackurlAddedPatients
      );
    };
    handleChange();
  }, []);

  return (
    <Box bgcolor={"azure"} flex={5}>
      <Fragment>
        <Container>
          <Box p={3}>
            <Typography variant="h6">
              <AccountBox /> Mój profil
            </Typography>
          </Box>
        </Container>
        <UserDetails data={userData} />

        <Container>
          <Box p={3}>
            <Typography variant="h6" marginBottom={"40px"}>
              <People /> Ostatnio dodani pacjenci
            </Typography>

            {addedPatients.map((patient) => (
              <Box mb={5}>
                <Patient key={patient["id"]} data={patient} />
              </Box>
            ))}
          </Box>
        </Container>
      </Fragment>
    </Box>
  );
}
