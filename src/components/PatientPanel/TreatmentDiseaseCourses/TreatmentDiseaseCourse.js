import { Fragment, useState } from "react"
import Popup from "../../Popup";
import TreatmentDiseaseCourseDetails from "./TreatmentDiseaseCourseDetails";

const TreatmentDiseaseCourse = (treatmentDiseaseCourse) => {

    return (
        <Fragment>
            <div>
                <button onClick={() => treatmentDiseaseCourse.onClick(treatmentDiseaseCourse.data)}>
                    {treatmentDiseaseCourse.data.date} {treatmentDiseaseCourse.data.diseaseCourse}
                </button>
            </div>
        </Fragment>
    );
}

export default TreatmentDiseaseCourse