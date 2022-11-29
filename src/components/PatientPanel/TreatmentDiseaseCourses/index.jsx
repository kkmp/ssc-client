import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import TreatmentDiseaseCourse from "./TreatmentDiseaseCourse";
import Errors from "../../Errors";
import TreatmentDiseaseCourseDetails from "./TreatmentDiseaseCourseDetails";
import Popup from "../../Popup";
import Paginate from "../../Paginate";
import getTokenData from "../../GetTokenData";
import { Typography, Box, styled, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HeartBroken } from "@mui/icons-material";
import AddTreatmentDiseaseCourse from "./AddTreatmentDiseaseCourse";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const TreatmentDiseaseCourses = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonAddPopup, setButtonAddPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const token = getTokenData()
        if (token == null || !(["Administrator", "Lekarz"].includes(token.role))) {
            return
        }

        const url = '/api/TreatmentDiseaseCourse/showTreatmentDiseaseCourses/' + id.id;
        const callback = (response) => {
            var newDataArr = response.data;
            setData(null)
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }

    const onClick = (data) => {
        setSelectedTestData(data)
        setButtonPopup(true)
    }

    const pageNumberChanged = (page) => {
        setPageNumber(page)
    }

    return (
        error != null ? <Errors data={error} /> :
            <Fragment>
                 <Box>
                    <Typography variant="h6" mb={5}><HeartBroken/>Powikłania</Typography> 
                </Box>

                <TableContainer component={Paper} sx={{borderRadius:'16px',  boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Data dodania</StyledTableCell>
                            <StyledTableCell align="center">Rodzaj powikłania</StyledTableCell>
                            <StyledTableCell align="center">Akcja</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {
                            data != null ?
                                <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((treatmentDiseaseCourse) => <TreatmentDiseaseCourse key={treatmentDiseaseCourse.id} data={treatmentDiseaseCourse} onClick={onClick} />)} />
                            : null
                        }

                        </TableBody>
                        <Button variant="outlined" size="normall" sx={{'margin':'10px'}} onClick={() => setButtonAddPopup(true)}>Dodaj powikłanie</Button>
                    </Table>
                </TableContainer>
                {
                    selectedTestData != null ?
                   <Popup component={<TreatmentDiseaseCourseDetails onSubmit={handleChange} id={selectedTestData.id} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null
                }

                <Popup component={<AddTreatmentDiseaseCourse onSubmit={handleChange} id={id} />} trigger={buttonAddPopup} setTrigger={setButtonAddPopup} />


                
                
            </Fragment>
    );
}

export default TreatmentDiseaseCourses