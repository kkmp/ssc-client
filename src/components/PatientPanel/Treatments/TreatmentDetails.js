import { Fragment, useState, useEffect } from "react"
import request from "../../Request"
import { Person } from "react-bootstrap-icons"
import Popup from "reactjs-popup"
import UserAvatar from "../../User/UserAvatar"
import EditTreatment from "./EditTreatment"
import Errors from "../../Errors"
import CustomPopup from "../../Popup"

const TreatmentDetails = (treatment) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/Treatment/showTreatmentDetails/' + treatment.id;
        const callback = (response) => {
            if (treatment.showEdit) {
                treatment.onSubmit()
            }
            var newDataArr = response.data;
            setData(newDataArr)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, type: "GET" }, callback, errorCallback);
    }

    const showCovidStatus = () => {
        switch (data.isCovid) {
            case true:
                return "Stwierdzono COVID"
            case false:
                return "Nie stwierdzono COVID"
            default:
                return "-"
        }
    }

    return (
        error != null ? <Errors data={error} /> :
            <Fragment>
                {data.startDate} {data.endDate} {showCovidStatus()} {data.treatmentStatus}
                {treatment.showEdit ? <Fragment>
                    <button onClick={() => setButtonPopup(true)}>Edytuj dane</button>
                    <Popup trigger={<button><Person /></button>} pinned position="bottom center">
                        <UserAvatar data={data} />
                    </Popup>
                </Fragment>
                    : null}
                <CustomPopup component={<EditTreatment id={treatment.id} data={data} onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
            </Fragment >
    );
}

export default TreatmentDetails