import { Fragment, useState, useEffect } from "react"
import request from "../../Request"
import { Person, HeartFill } from "react-bootstrap-icons"
import Popup from "reactjs-popup"
import UserAvatar from "../../User/UserAvatar"
import EditTreatmentDiseaseCourse from "./EditTreatmentDiseaseCourse"
import Errors from "../../Errors"
import CustomPopup from "../../Popup"
import TreatmentDetails from "../Treatments/TreatmentDetails"

const TreatmentDiseaseCourseDetails = (treatmentDiseaseCourse) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/TreatmentDiseaseCourse/showTreatmentDiseaseCourseDetails/' + treatmentDiseaseCourse.id;
        const callback = (response) => {
            treatmentDiseaseCourse.onSubmit()
            var newDataArr = response.data;
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }

    return (
        error != null ? <Errors data={error} /> :
            <Fragment>
                {data.date} {data.description} {data.diseaseCourse} {data.diseaseCourseDescription}
                <Popup trigger={<button><Person /></button>} pinned position="bottom center">
                    <UserAvatar data={data} />
                </Popup>
                <Popup trigger={<button><HeartFill /></button>} pinned position="bottom center">
                    <TreatmentDetails id={data.treatmentId} showEdit={false} />
                </Popup>
                <button onClick={() => setButtonPopup(true)}>Edytuj dane</button>
                <CustomPopup component={<EditTreatmentDiseaseCourse id={treatmentDiseaseCourse.id} data={data} onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
            </Fragment>
    );
}

export default TreatmentDiseaseCourseDetails