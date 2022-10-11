import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";

const EditMedicalHistory = (medicalHistory) => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleChange = () => {
            setDate(dateService(medicalHistory.data.date))
            setDescription(medicalHistory.data.description)
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/MedicalHistory/editMedicalHistory'
        const data = {
            "id": medicalHistory.id,
            "date": date,
            "description": description
        }
        const callback = () => {
            medicalHistory.onSubmit()
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
                <h3>Edytuj historię choroby</h3>
                <input type="datetime-local" name="date" value={date} onChange={({ target }) => setDate(target.value)} required />
                <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
                <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
            </form>
        </Fragment>
    );
}

export default EditMedicalHistory