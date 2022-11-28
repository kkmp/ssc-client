import { Fragment } from "react";
import { Woman, Man } from "@mui/icons-material";

import {
  Stack,
  Avatar,
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const Patient = (patient) => {
  const handleAction = (id) => {
    window.location = "/patient/" + id;
  };

  const Item = styled(Paper)(({ theme }) => ({
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
    <Fragment>

      <Item>
        <Stack direction={"row"} spacing={{ xs: 4, sm: 5, md:10}}>
          <Box>
            <Avatar sx={{ width: 56, height: 56, margin: "10px" }}>
              {" "}
              {patient.data.sex === "F" ? <Woman /> : <Man />}{" "}
            </Avatar>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Imię i nazwisko
              </Typography>
              <Typography variant="body1">
                {" "}
                {patient.data.name} {patient.data.surname}{" "}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Pesel{" "}
              </Typography>
              <Typography variant="body1"> {patient.data.pesel} </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Data urodzenia{" "}
              </Typography>
              <Typography variant="body1">
                {" "}
                {patient.data.birthDate != null
                  ? patient.data.birthDate.split(" ")[0]
                  : ""}{" "}
              </Typography>
            </Stack>
          </Box>

          <Box paddingTop={2.5}>
            <Button
              variant="outlined"
              onClick={() => handleAction(patient.data.id)}
            >
              Szczegóły
            </Button>
          </Box>
        </Stack>
      </Item>
    </Fragment>
  );
};

export default Patient;
