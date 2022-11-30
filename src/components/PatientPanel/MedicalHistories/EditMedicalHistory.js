import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import RequiredComponent from "../../RequiredComponent";

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
            <form onSubmit={handleSubmit}>
                <div className="pb-3 pt-3">
                    <h2>Edytuj wpis do historii choroby</h2>
                </div>
                {error != null ? <Errors data={error} /> : null}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="date">Data wpisu</label>
                    <RequiredComponent />
                    <input type="datetime-local" id="date" name="date" value={date} onChange={({ target }) => setDate(target.value)} required className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="description">Opis</label>
                    <RequiredComponent />
                    <textarea id="description" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required className="form-control" rows="3" placeholder="Dodaj opis" />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Zapisz zmiany</button>
                </div>
            </form>
        </Fragment>
    );
}

export default EditMedicalHistory