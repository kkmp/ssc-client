import { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import { Person, LocalHospital } from "@mui/icons-material";
import Popup from "reactjs-popup";
import UserAvatar from "../../User/UserAvatar";
import EditTreatmentDiseaseCourse from "./EditTreatmentDiseaseCourse";
import Errors from "../../Errors";
import CustomPopup from "../../Popup";
import { Button, Stack, Typography, Box } from "@mui/material";
import TreatmentAvatar from "../Treatments/TreatmentAvatar";

const TreatmentDiseaseCourseDetails = (treatmentDiseaseCourse) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleChange();
  }, []);

  const handleChange = async () => {
    const url =
      "/api/TreatmentDiseaseCourse/showTreatmentDiseaseCourseDetails/" +
      treatmentDiseaseCourse.id;
    const callback = (response) => {
      treatmentDiseaseCourse.onSubmit();
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
                Data dodania
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.date}{" "}
              </Typography>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Opis
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.description}{" "}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Powikłanie
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.diseaseCourse}{" "}
              </Typography>
            </Stack>
            <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
              <Typography variant="body2" sx={{ mt: 1.5 }} textAlign={"center"}>
                {" "}
                Charakterystyka powikłania
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                {" "}
                {data.diseaseCourseDescription}{" "}
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
                <TreatmentAvatar
                  id={data.treatmentId}
                  showEdit={false}
                  doNotShowUser={true}
                />
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
          <EditTreatmentDiseaseCourse
            id={treatmentDiseaseCourse.id}
            data={data}
            onSubmit={handleChange}
          />
        }
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      />
    </Fragment>
  );
};

export default TreatmentDiseaseCourseDetails;
