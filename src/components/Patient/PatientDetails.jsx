import { Fragment } from "react"
import { GenderFemale, GenderMale } from "react-bootstrap-icons";

const PatientDetails = (patient) => {
    return (
        <Fragment>
            <div>
                {patient.data.sex === 'F' ? <GenderFemale /> : <GenderMale />}
                {patient.data.name} {patient.data.surname} {patient.data.pesel} {patient.data.birthDate != null ? patient.data.birthDate.split(" ")[0] : ""} 
                {patient.data.street} {patient.data.address} {patient.data.phoneNumber} {patient.data.city} 
                {patient.data.province} {patient.data.citizenship}
            </div>
        </Fragment>
    );
}

export default PatientDetails