import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const AddTreatment = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [treatmentStatus, setTreatmentStatus] = useState("");
    const [treatmentStatusOptions, setTreatmentStatusOptions] = useState("");
    const [error, setError] = useState(null);

    const isCovidOptions = [
        { value: null, label: "-" },
        { value: true, label: "Stwierdzono COVID" },
        { value: false, label: "Nie stwierdzono COVID" }
    ]

    const [isCovid, setIsCovid] = useState(isCovidOptions[0]);

    useEffect(() => {
        const handleChange = () => {
            const urlTreatmentStatus = '/api/Data/getTreatmentStatuses'
            getDataSelect(urlTreatmentStatus).then((result) => {
                setTreatmentStatusOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/Treatment/addTreatment'
        var data = {
            "startDate": startDate,
            "patientId": props.id.id,
            "treatmentStatusId": treatmentStatus.value
        }

        if (endDate) {
            data.endDate = endDate
        } 

        if (isCovid) {
            data.isCovid = isCovid.value
        } 

        if (!treatmentStatus) {
            setError({ errors: { message: ["Aby zapisać, należy wybrać status leczenia"] } })
            return
        }

        const callback = () => {
            props.onSubmit()
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "POST" }, callback, errorCallback);
    };

    return (
        <Fragment>
            {error != null ? <Errors data={error} /> : null}
            <form onSubmit={handleSubmit} className="mt-5">
                <h3>Edytuj powikłanie</h3>
                <label>Data rozpoczęcia leczenia:</label>
                <input type="datetime-local" name="startDate" value={startDate} onChange={({ target }) => setStartDate(target.value)} required />
                <label>Data zakończenia leczenia:</label>
                <input type="datetime-local" name="endDate" value={endDate} onChange={({ target }) => setEndDate(target.value)} />
                <label>Stwierdzenie zachorowania na COVID:</label>
                <Select required
                    value={isCovid}
                    onChange={setIsCovid}
                    options={isCovidOptions} />
                <label>Status leczenia:</label>
                {treatmentStatusOptions ? <Select required
                    value={treatmentStatus}
                    onChange={setTreatmentStatus}
                    options={treatmentStatusOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
            </form>
        </Fragment>
    );
}

export default AddTreatment