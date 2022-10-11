import { Fragment, useState, useEffect } from "react"
import Popup from 'reactjs-popup';
import CustomPopup from "../../Popup";
import UserAvatar from "../../User/UserAvatar";
import { Person } from "react-bootstrap-icons";
import EditMedicalHistory from "./EditMedicalHistory";
import Errors from "../../Errors";
import request from "../../Request";

const MedicalHistoryDetails = (medicalHistory) => {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const url = '/api/MedicalHistory/showMedicalHistoryDetails/' + medicalHistory.id;
        const callback = (response) => {
            medicalHistory.onSubmit()
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
            {data.date}  {data.description}
            <Popup trigger={<button><Person /></button>} pinned position="bottom center">
                <UserAvatar data={data} />
            </Popup>
            <button onClick={() => setButtonPopup(true)}>Edytuj dane</button>
            <CustomPopup component={<EditMedicalHistory onSubmit={handleChange} id={medicalHistory.id} data={data}/>} trigger={buttonPopup} setTrigger={setButtonPopup} />
        </Fragment>
    );
}

export default MedicalHistoryDetails