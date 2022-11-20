import { Fragment, useState } from "react"
import showResult from "./ShowResult"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const Test = (test) => {
    return (
        <Fragment>
            
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row" align="center">{test.data.orderNumber} </StyledTableCell>
                            <StyledTableCell align="center">{test.data.testType}</StyledTableCell>
                            <StyledTableCell align="center">{test.data.testDate}</StyledTableCell>
                            <StyledTableCell align="center">{test.data.resultDate}</StyledTableCell>
                            <StyledTableCell align="center">{showResult(test.data.result)}</StyledTableCell>
                            <StyledTableCell align="center">{test.data.place}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button size='small' variant='outlined' onClick={() => test.onClick(test.data)}>
                                Edytuj
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>        
            
        </Fragment>
    );
}

export default Test