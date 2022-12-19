import { Fragment } from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MedicalHistory = (medicalHistory) => {
  return (
    <Fragment>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" align="center">
          {medicalHistory.data.date}{" "}
        </StyledTableCell>
        <StyledTableCell align="center">
          {medicalHistory.data.description}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Button
            size="small"
            variant="outlined"
            onClick={() => medicalHistory.onClick(medicalHistory.data)}
          >
            Edytuj
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </Fragment>
  );
};

export default MedicalHistory;
