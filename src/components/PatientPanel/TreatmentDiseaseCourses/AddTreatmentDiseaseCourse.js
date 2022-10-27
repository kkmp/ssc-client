import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const AddTreatmentDiseaseCourse = (props) => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [diseaseCourse, setDiseaseCourse] = useState("");
    const [diseaseCourseOptions, setDiseaseCourseOptions] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        const handleChange = () => {
            const urlDiseaseCourse = '/api/Data/getDiseaseCourses'
            getDataSelect(urlDiseaseCourse).then((result) => {
                setDiseaseCourseOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/TreatmentDiseaseCourse/addTreatmentDiseaseCourse'
        const data = {
            "date": date,
            "description": description,
            "diseaseCourseId": diseaseCourse.value,
            "patientId": props.id.id
        }

        if (!diseaseCourse) {
            setError({ errors: { message: ["Aby zapisać, należy wybrać rodzaj powikłania"] } })
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
                <h3>Dodaj powikłanie</h3>
                <label>Data:</label>
                <input type="datetime-local" name="date" value={date} onChange={({ target }) => setDate(target.value)} required />
                <label>Opis:</label>
                <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
                <label>Rodzaj powikłania:</label>
                {diseaseCourseOptions ? <Select required
                    value={diseaseCourse}
                    onChange={setDiseaseCourse}
                    options={diseaseCourseOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                <button type="submit" className="btn btn-primary btn-lg w-100">Dodaj wpis</button>
            </form>
        </Fragment>
    );
}

export default AddTreatmentDiseaseCourse