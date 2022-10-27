import React, { Fragment, useState } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";

const AddMedicalHistory = (props) => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/MedicalHistory/addMedicalHistory'
        console.log(props.id)
        const data = {
            "date": date,
            "description": description,
            "patientId": props.id.id
        }
        const callback = () => {
            props.onSubmit()
            toast.success("Dodano wpis do historii medycznej", { position: toast.POSITION.BOTTOM_RIGHT });
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
            <form onSubmit={handleSubmit}>
                <h3>Dodaj historię choroby</h3>
                <label>Data wpisu: </label>
                <input type="datetime-local" name="date" value={date} onChange={({ target }) => setDate(target.value)} required />
                <label>Opis: </label>
                <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
                <button type="submit" className="btn btn-primary btn-lg w-100">Dodaj wpis</button>
            </form>
        </Fragment>
    );
}

export default AddMedicalHistory