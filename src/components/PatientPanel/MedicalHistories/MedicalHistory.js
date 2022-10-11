import { Fragment, useState } from "react"

const MedicalHistory = (medicalHistory) => {

    return (
        <Fragment>
            <button onClick={() => medicalHistory.onClick(medicalHistory.data)}>
                {medicalHistory.data.date} {medicalHistory.data.description}
            </button>
        </Fragment>
    );
}

export default MedicalHistory