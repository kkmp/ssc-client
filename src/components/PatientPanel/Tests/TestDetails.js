import { Fragment, useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import CustomPopup from "../../Popup";
import UserAvatar from "../../User/UserAvatar";
import { Person, HeartFill } from "react-bootstrap-icons";
import showResult from "./ShowResult";
import request from "../../Request";
import Errors from "../../Errors";
import EditTest from "./EditTest";
import TreatmentDetails from "../Treatments/TreatmentDetails";

const TestDetails = (test) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/Test/testDetails/' + test.id;
        const callback = (response) => {
            test.onSubmit()
            var newDataArr = response.data
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
                {data.orderNumber} {data.testType} {data.testDate} {data.resultDate} {data.placeName} {data.placeStreet} {data.placeCityName} ({data.placeCityProvinceName}) {showResult(data.result)}
                <Popup trigger={<button><Person /></button>} pinned position="bottom center">
                    <UserAvatar data={data} />
                </Popup>
                <Popup trigger={<button><HeartFill /></button>} pinned position="bottom center">
                    <TreatmentDetails id={data.treatmentId} showEdit={false} />
                </Popup>
                <button onClick={() => setButtonPopup(true)}>Edytuj dane</button>
                <CustomPopup component={<EditTest onSubmit={handleChange} id={test.id} data={data} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
            </Fragment>
    );
}

export default TestDetails