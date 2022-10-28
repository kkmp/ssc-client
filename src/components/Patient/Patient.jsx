import { Fragment } from "react"
import { Woman, Man } from "@mui/icons-material";
import { TableCell, Paper, Button, Avatar } from "@mui/material";

const Patient = (patient) => {
    const handleAction = (id) => {
        window.location = '/patient/' + id
    }

    return (
        <Fragment>
            <TableCell><Avatar>{patient.data.sex === 'F' ? <Woman /> : <Man />}</Avatar></TableCell>
            <TableCell>{patient.data.name}</TableCell>
            <TableCell>{patient.data.surname}</TableCell>
            <TableCell>{patient.data.pesel}</TableCell>
            <TableCell>{patient.data.birthDate != null ? patient.data.birthDate.split(" ")[0] : ""}</TableCell>
            <TableCell><Button variant="outlined" size="small" onClick={() => handleAction(patient.data.id)}>Szczegóły</Button></TableCell>           
           
        </Fragment>
        
            


        
    );
}

export default Patient