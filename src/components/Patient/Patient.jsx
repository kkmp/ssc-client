import { Fragment } from "react"
import { Female, Male } from "@mui/icons-material";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material";

const Patient = (patient) => {
    const handleAction = (id) => {
        window.location = '/patient/' + id
    }

    return (
        <Fragment>
            <TableCell>{patient.data.sex === 'F' ? <Female /> : <Male />}</TableCell>
            <TableCell>{patient.data.name}</TableCell>
            <TableCell>{patient.data.surname}</TableCell>
            <TableCell>{patient.data.pesel}</TableCell>
            <TableCell>{patient.data.birthDate != null ? patient.data.birthDate.split(" ")[0] : ""}</TableCell>
            <TableCell><Button variant="outlined" size="small" onClick={() => handleAction(patient.data.id)}>Szczegóły</Button></TableCell>           
           
        </Fragment>
        
            


        
    );
}

export default Patient