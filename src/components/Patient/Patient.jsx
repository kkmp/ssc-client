import { Fragment } from "react"
import { GenderFemale, GenderMale } from "react-bootstrap-icons";

const Patient = (patient) => {
    const handleAction = (id) => {
        window.location = '/patient/' + id
    }

    return (
        <Fragment>
            <div>
                {patient.data.sex === 'F' ? <GenderFemale /> : <GenderMale />}
                {patient.data.name} {patient.data.surname} {patient.data.pesel} {patient.data.birthDate != null ? patient.data.birthDate.split(" ")[0] : ""}
                <button onClick={() => handleAction(patient.data.id)}>Szczegóły</button>
            </div>
        </Fragment>
    );
}

export default Patient