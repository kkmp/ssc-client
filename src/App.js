import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import ChangePassword from "./components/ChangePassword"
import AddPatient from "./components/AddPatient"
import UseCode from "./components/UseCode"
import SearchPatient from "./components/SearchPatient"
import SearchUser from "./components/SearchUser"
import PatientPanel from "./components/PatientPanel"
import UserPanel from "./components/UserPanel"
import AddUser from "./components/AddUser"
import NavBar from "./components/NavBar/NavBar"
import { ToastContainer } from "react-toastify"
import './App.css';
import { Fragment } from "react"
import 'react-toastify/dist/ReactToastify.css'
import NavMenu from "./components/NavMenu/NavMenu"
import Unauthorized from "./components/Unauthorized"
import ProtectedRoute from "./components/ProtectedRoute"
import Analysis from "./components/Analysis"
import {Box, Container, Stack} from  "@mui/material"



function App(props) {
  return (
    
    <Fragment>
      <NavBar />
      
      <Box>
        <Stack direction="row">
          <NavMenu />
          
        
      
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/changePassword" exact element={<ChangePassword />} />
        <Route path="/changePassword/useCode/:code" exact element={<UseCode />} />
        <Route path="/unauthorized" exact element={<Unauthorized />} />

        <Route path="/" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]} redirect="/login">
              <Home />
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/addPatient" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <AddPatient />
          </ProtectedRoute>}>
        </Route>

        <Route path="/searchPatient" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <SearchPatient />
          </ProtectedRoute>}>
        </Route>

        <Route path="/patient/:id" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <PatientPanel />
          </ProtectedRoute>}>
        </Route>


        <Route path="/searchUser" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <SearchUser />
          </ProtectedRoute>}>
        </Route>

        <Route path="/user/:id" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <UserPanel />
          </ProtectedRoute>}>
        </Route>

        <Route path="/addUser" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <AddUser />
          </ProtectedRoute>}>
        </Route>

        <Route path="/analysis" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz"]}>
            <Analysis />
          </ProtectedRoute>}>
        </Route>
      </Routes>
      <ToastContainer />
      </Stack>
      </Box>
    </Fragment>
 
  );
}

export default App;
