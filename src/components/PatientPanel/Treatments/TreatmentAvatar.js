import { Fragment } from "react"
import TreatmentDetails from "./TreatmentDetails";

import '../../User/UserAvatar.css'

const TreatmentAvatar = (treatment) => {

    return (
        <Fragment>
            <div className="box">
                <TreatmentDetails id={treatment.id} showEdit={false} doNotShowUser={true}/>
            </div>
        </Fragment>
    );
}

export default TreatmentAvatar