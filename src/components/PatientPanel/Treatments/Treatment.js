import { Fragment } from "react"

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
            <div>
                <button onClick={() => treatment.onClick(treatment.data)}>
                    {treatment.data.startDate} {treatment.data.endDate} {showCovidStatus()} {treatment.data.treatmentStatus}
                </button>
            </div>
        </Fragment>
    );
}

export default Treatment