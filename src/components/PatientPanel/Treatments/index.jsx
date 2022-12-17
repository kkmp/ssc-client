import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import Treatment from "./Treatment";
import Errors from "../../Errors";
import Paginate from "../../Paginate";
import Popup from "../../Popup";
import TreatmentDetails from "./TreatmentDetails";
import getTokenData from "../../GetTokenData";
import { HealthAndSafety } from "@mui/icons-material";
import { Typography, Box, Button, styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddTreatment from "./AddTreatment";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

const Treatments = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)
    const [buttonAddPopup, setButtonAddPopup] = useState(false)


    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const token = getTokenData()
        if (token == null || !(["Administrator", "Lekarz", "Laborant"].includes(token.role))) {
            return
        }
        
        const url = '/api/Treatment/showTreatments/' + id.id;
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
                    <Typography variant="h6" mb={5}><HealthAndSafety/>Leczenie</Typography> 
                </Box>

                <TableContainer component={Paper} sx={{borderRadius:'16px',  boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Data rozpoczęcia</StyledTableCell>
                            <StyledTableCell align="center">Data zakończenia</StyledTableCell>
                            <StyledTableCell align="center">Zachorowanie na COVID</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Akcja</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {
                            data != null ?
                            <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((treatment) => <Treatment key={treatment.id} data={treatment} onClick={onClick} />)} />
                            : null
                        }

                        </TableBody>
                        <Button variant="outlined" size="normall" sx={{'margin':'10px'}} onClick={() => setButtonAddPopup(true)}>Dodaj leczenie</Button>
                    </Table>
                </TableContainer>
                
                {selectedTestData != null ?
                        <Popup component={<TreatmentDetails onSubmit={handleChange} id={selectedTestData.id} showEdit={true}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
                        : null}

                <Popup component={<AddTreatment onSubmit={handleChange} id={id} />} trigger={buttonAddPopup} setTrigger={setButtonAddPopup} />

                
            </Fragment>
    );
}

export default Treatments