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
import Helper from "./components/Helper/Helper"
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
import Footer from "./components/Footer/Footer"



function App(props) {
  return (
    
    <Fragment>
          
      <Routes>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/changePassword" exact element={<ChangePassword />} />
        <Route path="/changePassword/useCode/:code" exact element={<UseCode />} />
        <Route path="/unauthorized" exact element={<Unauthorized />} />

        <Route path="/" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]} redirect="/login">
            
             <Box bgcolor={'azure'}>
                <NavBar />
                
                <Stack direction="row">
                  <NavMenu />
                  <Home />
                </Stack>
                <Footer>
                  
                </Footer>
                
              </Box>
              
              
          </ProtectedRoute>}>
        </Route>

        <Route path="/addPatient" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <Box>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <AddPatient />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/searchPatient" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <SearchPatient />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/patient/:id" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <PatientPanel />
                </Stack>

                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>


        <Route path="/searchUser" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <SearchUser />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/user/:id" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <UserPanel />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/addUser" exact element={
          <ProtectedRoute roles={["Administrator"]}>
            <Box>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <AddUser />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/help" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz", "Laborant"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <Helper />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>

        <Route path="/analysis" exact element={
          <ProtectedRoute roles={["Administrator", "Lekarz"]}>
            <Box bgcolor={'azure'}>
                <NavBar />
                <Stack direction="row">
                  <NavMenu />
                  <Analysis />
                </Stack>
                <Footer>
                  
                </Footer>
              </Box>
            
          </ProtectedRoute>}>
        </Route>
      </Routes>
      <ToastContainer />
      
    </Fragment>
    
 
  );
}

export default App;
