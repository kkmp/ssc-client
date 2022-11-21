import { Fragment } from "react"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';



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

const Treatment = (treatment) => {
    const showCovidStatus = () => {
        switch (treatment.data.isCovid) {
            case true:
                return "Stwierdzono COVID"
            case false:
                return "Nie stwierdzono COVID"
            default:
                return "-"
        }
    }

    return (
        <Fragment>
            <StyledTableRow>
          <StyledTableCell component="th" scope="row" align="center">
            {treatment.data.startDate}{" "}
          </StyledTableCell>
          <StyledTableCell align="center">{treatment.data.endDate}</StyledTableCell>
          <StyledTableCell align="center"> SPRAWDZIC W BAZIE CZY JEST POLE JAK NIE USTALIC</StyledTableCell>
          <StyledTableCell align="center">{showCovidStatus()}</StyledTableCell>
          <StyledTableCell align="center">
             {treatment.data.treatmentStatus}
          </StyledTableCell>
          <StyledTableCell align="center">
            <Button
              size="small"
              variant="outlined"
              onClick={() => treatment.onClick(treatment.data)}
            >
              Edytuj
            </Button>
          </StyledTableCell>
        </StyledTableRow>
        {console.log(treatment.data)}
        </Fragment>
    );
}

export default Treatment