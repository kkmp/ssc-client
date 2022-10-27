import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const AddTest = (props) => {
    const [testDate, setTestDate] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [testType, setTestType] = useState("");
    const [testTypeOptions, setTestTypeOptions] = useState("");
    //const [place, setPlace] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [error, setError] = useState(null);

    const resultOptions = [
        { value: '', label: "Brak wyniku" },
        { value: 'P', label: "Pozytywny" },
        { value: 'N', label: "Negatywny" },
        { value: 'I', label: "Nierozstrzygający" },
    ]

    const [result, setResult] = useState(resultOptions[0]);

    useEffect(() => {
        const handleChange = () => {
            const urlTestType = '/api/Data/getTestTypes'
            getDataSelect(urlTestType).then((result) => {
                setTestTypeOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = '/api/Test/addTest'
        var data = {
            "testDate": testDate,
            "orderNumber": orderNumber,
            "testTypeId": testType.value,
            "placeId": "4c88f393-160c-4fa0-ac47-3130fc798c0f", //tymczasowo!!!!
            "patientId": props.id.id
        }

        if (!testType) {
            setError({ errors: { message: ["Aby zapisać, należy wybrać typ testu"] } })
            return
        }

        if (result.value && resultDate) {
            data.result = result.value
            data.resultDate = resultDate
        } else if (!(result.value === '' && resultDate === '')) {
            setError({ errors: { message: ["Aby zapisać, należy podać datę wyniku i wybrać rodzaj wyniku"] } })
            return
        }

        const callback = () => {
            props.onSubmit()
            toast.success("Dodano test", { position: toast.POSITION.BOTTOM_RIGHT });
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
                <h3>Dodaj nowy test</h3>
                <label>Numer testu: </label>
                <input type="text" name="orderNumber" value={orderNumber} onChange={({ target }) => setOrderNumber(target.value)} required />
                <label>Data wykonania testu: </label>
                <input type="datetime-local" name="testDate" value={testDate} onChange={({ target }) => setTestDate(target.value)} required />
                <label>Wynik testu: </label>
                <Select required name="result" value={result} onChange={setResult} options={resultOptions} placeholder="Wybierz wynik lub pozostaw pusty" />
                <label>Data wyniku testu: </label>
                <input type="datetime-local" name="resultDate" value={resultDate} onChange={({ target }) => setResultDate(target.value)} />
                <label>Typ testu: </label>
                {testTypeOptions ? <Select required
                    value={testType}
                    onChange={setTestType}
                    options={testTypeOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                {/* <input type="text" name="place" value={place} onChange={({ target }) => setPlace(target.value)} required />*/}
                <button type="submit" className="btn btn-primary btn-lg w-100">Dodaj test</button>
            </form>
        </Fragment>
    );
}

export default AddTest