import { Fragment, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import CustomPopup from "../../Popup";
import UserAvatar from "../../User/UserAvatar";
import { Person, LocalHospital } from "@mui/icons-material";
import request from "../../Request";
import Errors from "../../Errors";
import EditTest from "./EditTest";
import { Stack, Typography, Box, Button } from "@mui/material";
import TreatmentAvatar from "../Treatments/TreatmentAvatar";
import { showResultChip } from "./ShowResultChip";

const TestDetails = (test) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleChange();
  }, []);

  const handleChange = async () => {
    const url = "/api/Test/testDetails/" + test.id;
    const callback = (response) => {
      test.onSubmit();
      var newDataArr = response.data;
      setData(newDataArr);
      setError(null);
    };
    const errorCallback = (response) => {
      setError(response.data);
    };
    await request({ url: url, type: "GET" }, callback, errorCallback);
  };

  return error != null ? (
    <Errors data={error} />
  ) : (
    <Fragment>
      <Box marginTop={2}>
        <Stack direction={"row"} spacing={{ xs: 4, sm: 5, md: 10 }}>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Nr testu
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.orderNumber}{" "}
              </Typography>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Typ testu
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.testType}{" "}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Data i godzina wykonania testu
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.testDate}{" "}
              </Typography>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Data i godzina wyniku testu
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.resultDate}{" "}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Miejsce wykonania
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.placeName}{" "}
              </Typography>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Wynik
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {showResultChip(data.result)}{" "}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Dodano przez
              </Typography>
              <Popup
                trigger={
                  <Button variant="text">
                    <Person />
                  </Button>
                }
                pinned
                position="bottom center"
              >
                <UserAvatar data={data} />
              </Popup>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Stan zdrowia pacjenta
              </Typography>
              <Popup
                trigger={
                  <Button variant="text">
                    <LocalHospital />
                  </Button>
                }
                pinned
                position="bottom center"
              >
                <TreatmentAvatar id={data.treatmentId} showEdit={false} />
              </Popup>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Button variant="outlined" onClick={() => setButtonPopup(true)}>
        Edytuj dane
      </Button>
      <CustomPopup
        component={
          <EditTest onSubmit={handleChange} id={test.id} data={data} />
        }
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      />
    </Fragment>
  );
};

export default TestDetails;
