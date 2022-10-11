import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const EditTreatmentDiseaseCourse = (treatmentDiseaseCourse) => {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [diseaseCourse, setDiseaseCourse] = useState("");
    const [diseaseCourseOptions, setDiseaseCourseOptions] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleChange = () => {
            setDate(dateService(treatmentDiseaseCourse.data.date))
            setDescription(treatmentDiseaseCourse.data.description)
            setDiseaseCourse({ value: treatmentDiseaseCourse.data.diseaseCourseId, label: treatmentDiseaseCourse.data.diseaseCourse })

            const urlDiseaseCourse = '/api/Data/getDiseaseCourses'
            getDataSelect(urlDiseaseCourse).then((result) => {
                setDiseaseCourseOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/TreatmentDiseaseCourse/editTreatmentDiseaseCourse'
        const data = {
            "id": treatmentDiseaseCourse.id,
            "date": date,
            "description": description,
            "diseaseCourseId": diseaseCourse.value
        }
        const callback = () => {
            treatmentDiseaseCourse.onSubmit()
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
                <input type="datetime-local" name="date" value={date} onChange={({ target }) => setDate(target.value)} required />
                <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
                {diseaseCourseOptions ? <Select required
                    value={diseaseCourse}
                    onChange={setDiseaseCourse}
                    options={diseaseCourseOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
            </form>
        </Fragment>
    );
}

export default EditTreatmentDiseaseCourse