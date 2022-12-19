import { Fragment } from "react";
import { Woman, Man } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Stack, Avatar, Box, Paper, Typography } from "@mui/material";

const PatientDetails = (patient) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "fbfbfbfb",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "16px",
    maxHeight: "300px",
    display: "flex",
    boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)",
  }));

  return (
    <Fragment>
      <Item>
        <Stack direction={"row"} spacing={{ xs: 4, sm: 5, md: 10 }}>
          <Box>
            <Avatar sx={{ width: 80, height: 80, margin: "20px" }}>
              {" "}
              {patient.data.sex === "F" ? (
                <Woman sx={{ width: 40, height: 40 }} />
              ) : (
                <Man sx={{ width: 40, height: 40 }} />
              )}{" "}
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

            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Telefon{" "}
              </Typography>
              <Typography variant="body1">
                {patient.data.phoneNumber}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Adres{" "}
              </Typography>
              <Typography variant="body1">
                {patient.data.street} {patient.data.address}
              </Typography>
            </Stack>

            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Miasto{" "}
              </Typography>
              <Typography variant="body1">{patient.data.city}</Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Województwo{" "}
              </Typography>
              <Typography variant="body1">{patient.data.province}</Typography>
            </Stack>

            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Obywatelstwo{" "}
              </Typography>
              <Typography variant="body1">
                {patient.data.citizenship}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Item>
    </Fragment>
  );
};

export default PatientDetails;
