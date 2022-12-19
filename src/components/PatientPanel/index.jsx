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
import getTokenData from "../GetTokenData";
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export function BasicTabs() {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = getTokenData();
    if (user != null) {
      setRole(user.role);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        m={3}
        sx={{ borderBottom: 1, borderColor: "divider" }}
        display={"flex"}
        justifyContent={"left"}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab icon={<Vaccines />} label="Testy" {...a11yProps(0)} />
          {role === "Laborant" ? null : (
            <Tab
              icon={<MedicalInformation />}
              label="Historia choroby"
              {...a11yProps(1)}
            />
          )}

          <Tab icon={<HealthAndSafety />} label="Leczenie" {...a11yProps(2)} />
          {role === "Laborant" ? null : (
            <Tab icon={<HeartBroken />} label="Powikłania" {...a11yProps(2)} />
          )}

          <Tab
            icon={<Edit />}
            label="Edytuj dane"
            onClick={() => setButtonPopup(true)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tests id={id} />
      </TabPanel>
      {role === "Laborant" ? null : (
        <TabPanel value={value} index={1}>
          <MedicalHistories id={id} />
        </TabPanel>
      )}
      <TabPanel value={value} index={2}>
        <Treatments id={id} />
      </TabPanel>
      {role === "Laborant" ? null : (
        <TabPanel value={value} index={3}>
          <TreatmentDiseaseCourses id={id} />
        </TabPanel>
      )}

      <Popup
        component={<EditPatient onSubmit={handleChange} />}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      />
    </Box>
  );
}

const PatientPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const handleChange = async () => {
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
    handleChange();
  }, []);

  return error != null ? (
    <Errors data={error} />
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
        <Box>
          <BasicTabs />
        </Box>
      </Container>
    </Fragment>
  ) : (
    <div className="spinner-border" role="status"></div>
  );
};

export default PatientPanel;
