import React, { Fragment, useState, useEffect } from "react";
import request from "../../Request";
import Test from "./Test";
import Errors from "../../Errors";
import Paginate from "../../Paginate";
import Popup from "../../Popup";
import TestDetails from "./TestDetails";
import { Typography, Box } from "@mui/material";
import { Vaccines } from "@mui/icons-material"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

const Tests = (id) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [selectedTestData, setSelectedTestData] = useState(null)

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/Test/showTests/' + id.id;
        const callback = (response) => {
            var newDataArr = response.data;
            setData(null) //<-----------------------------
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
                <Typography variant="h6" mb={5}><Vaccines/>Testy</Typography> 
                </Box>

                <TableContainer component={Paper} sx={{borderRadius:'16px',  boxShadow: "1px 0px 21px 4px rgba(66, 68, 90, 1)"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nr testu</StyledTableCell>
                            <StyledTableCell align="center">Typ</StyledTableCell>
                            <StyledTableCell align="center">Data zlecenia</StyledTableCell>
                            <StyledTableCell align="center">Data wykonania</StyledTableCell>
                            <StyledTableCell align="center">Wynik</StyledTableCell>
                            <StyledTableCell align="center">Miejsce wykonania</StyledTableCell>
                            <StyledTableCell align="center">Akcja</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {data != null ?
                        <Paginate pageNumberChanged={pageNumberChanged} pageNumber={pageNumber} data={data.map((test) => <Test key={test.id} data={test} onClick={onClick} />)} />
                        : null}
                        
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {selectedTestData != null ?
                    <Popup component={<TestDetails onSubmit={handleChange} id={selectedTestData.id} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
                    : null}


                
                
                
            </Fragment>

    );
}

export default Tests

