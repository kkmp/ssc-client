import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const EditTreatment = (treatment) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCovid, setIsCovid] = useState("");
    const [treatmentStatus, setTreatmentStatus] = useState("");
    const [treatmentStatusOptions, setTreatmentStatusOptions] = useState("");
    const [error, setError] = useState(null);

    const isCovidOptions = [
        { value: '', label: "-" },
        { value: 'true', label: "Stwierdzono COVID" },
        { value: 'false', label: "Nie stwierdzono COVID" },
    ]
    useEffect(() => {
        const handleChange = () => {
            setStartDate(dateService(treatment.data.startDate))
            setEndDate(dateService(treatment.data.endDate))
            setTreatmentStatus({ value: treatment.data.treatmentStatusId, label: treatment.data.treatmentStatus })
            if (treatment.data.isCovid !== null) {
                var resultSearch = isCovidOptions.filter(item => item.value === treatment.data.isCovid)
                setIsCovid(resultSearch[0])
            }
            else {
                setIsCovid(isCovidOptions[0])
            }

            const urlTreatmentStatus = '/api/Data/getTreatmentStatuses'
            getDataSelect(urlTreatmentStatus).then((result) => {
                setTreatmentStatusOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/Treatment/editTreatment'
        var data = {
            "id": treatment.id,
            "startDate": startDate,
            "treatmentStatusId": treatmentStatus.value
        }

        if (endDate) {
            data.endDate = endDate
        } 

        const callback = () => {
            treatment.onSubmit()
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "PUT" }, callback, errorCallback);
    };

    return (
        <Fragment>
            {error != null ? <Errors data={error} /> : null}
            <form onSubmit={handleSubmit} className="mt-5">
                <h3>Edytuj powikłanie</h3>
                <input type="datetime-local" name="startDate" value={startDate} onChange={({ target }) => setStartDate(target.value)} required />
                <input type="datetime-local" name="endDate" value={endDate} onChange={({ target }) => setEndDate(target.value)} />
                <Select required
                    value={isCovid}
                    onChange={setIsCovid}
                    options={isCovidOptions} />
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

export default EditTreatment