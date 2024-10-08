import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import request from "../Request";
import PatientDetails from "../Patient/PatientDetails";
import Tests from "./Tests";
import MedicalHistories from "./MedicalHistories";
import EditPatient from "./EditPatient";
import Treatments from "./Treatments";
import TreatmentDiseaseCourses from "./TreatmentDiseaseCourses";
import Errors from "../Errors";
import Popup from "../Popup";
import { Container, Box, Typography } from "@mui/material";
import { AccountBox, Edit } from "@mui/icons-material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Vaccines,
  MedicalInformation,
  HealthAndSafety,
  HeartBroken,
} from "@mui/icons-material";
import getTokenData from "../GetTokenData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PatientPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const [value, setValue] = React.useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);

  const [role, setRole] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = async () => {
    const url = "/api/Patient/patientDetails/" + id;
    const callback = (response) => {
      var newDataArr = response.data;
      setData(newDataArr);
      setError(null);
    };
    const errorCallback = (response) => {
      setError(response.data);
    };
    await request({ url: url, type: "GET" }, callback, errorCallback);
  };

  useEffect(() => {
    const user = getTokenData();
    if (user != null) {
      setRole(user.role);
    }
    handleChange1();
  }, []);

  return error != null ? (
    <Box p={3}>
      <Errors data={error} />
    </Box>
  ) : data != null ? (
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

        {role === "Laborant" ? (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab icon={<Vaccines />} label="Testy" {...a11yProps(0)} />
            <Tab
              icon={<HealthAndSafety />}
              label="Leczenie"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Edit />}
              label="Edytuj dane"
              onClick={() => setButtonPopup(true)}
            />
          </Tabs>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab icon={<Vaccines />} label="Testy" {...a11yProps(0)} />
            <Tab
              icon={<MedicalInformation />}
              label="Historia choroby"
              {...a11yProps(1)}
            />
            <Tab
              icon={<HealthAndSafety />}
              label="Leczenie"
              {...a11yProps(2)}
            />
            <Tab icon={<HeartBroken />} label="Powikłania" {...a11yProps(2)} />
            <Tab
              icon={<Edit />}
              label="Edytuj dane"
              onClick={() => setButtonPopup(true)}
            />
          </Tabs>
        )}

        {role === "Laborant" ? (
          <Fragment>
            <TabPanel value={value} index={0}>
              <Tests id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Treatments id={id} />
            </TabPanel>
          </Fragment>
        ) : (
          <Fragment>
            <TabPanel value={value} index={0}>
              <Tests id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MedicalHistories id={id} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Treatments id={id} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <TreatmentDiseaseCourses id={id} />
            </TabPanel>
          </Fragment>
        )}

        <Popup
          component={<EditPatient onSubmit={handleChange1} />}
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
        />
      </Container>
    </Fragment>
  ) : (
    <div className="spinner-border" role="status"></div>
  );
};

export default PatientPanel;
