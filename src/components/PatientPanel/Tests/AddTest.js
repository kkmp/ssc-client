import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";
import AddPlace from "./AddPlace";
import Popup from "../../Popup";
import RequiredComponent from "../../RequiredComponent";
import LoadingComponent from "../../LoadingComponent";

const AddTest = (props) => {
    const [testDate, setTestDate] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [testType, setTestType] = useState("");
    const [testTypeOptions, setTestTypeOptions] = useState("");
    const [place, setPlace] = useState("");
    const [placeOptions, setPlaceOptions] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [error, setError] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false)

    const resultOptions = [
        { value: '', label: "-" },
        { value: 'P', label: "Pozytywny" },
        { value: 'N', label: "Negatywny" },
        { value: 'I', label: "Nierozstrzygający" },
    ]

    const [result, setResult] = useState(resultOptions[0]);

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        const urlTestType = '/api/Data/getTestTypes'
        getDataSelect(urlTestType).then((result) => {
            setTestTypeOptions(result)
        })

        const urlPlace = '/api/Data/getPlaces'
        var arr = []
        const callback = (response) => {
            response.data.map((item) => arr.push({ value: item.id, label: item.name + ', ' + item.street + ', ' + item.cityName + ' (' + item.cityProvinceName + ')' }))
        }
        await request({ url: urlPlace, type: "GET" }, callback);
        setPlaceOptions(arr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = '/api/Test/addTest'
        var data = {
            "testDate": testDate,
            "orderNumber": orderNumber,
            "testTypeId": testType.value,
            "placeId": place.value,
            "patientId": props.id.id
        }

        if (!testType) {
            setError({ errors: { message: ["Aby zapisać, należy wybrać typ testu"] } })
            return
        }

        if (!place) {
            setError({ errors: { message: ["Aby zapisać, należy wybrać placówkę"] } })
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
            <form onSubmit={handleSubmit}>
                <div className="pb-3 pt-3">
                    <h2>Nowy test</h2>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="orderNumber">Numer testu</label>
                    <RequiredComponent />
                    <input type="text" id="orderNumber" name="orderNumber" value={orderNumber} onChange={({ target }) => setOrderNumber(target.value)} required className="form-control" maxLength={12} minLength={12} placeholder={"Podaj numer testu"} />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="testDate">Data i godzina wykonania testu</label>
                    <RequiredComponent />
                    <input type="datetime-local" id="testDate" name="testDate" value={testDate} onChange={({ target }) => setTestDate(target.value)} required className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="result">Wynik testu</label>
                    <div className="form-outline mb-4">
                        <Select id="result" name="result" placeholder="Wybierz wynik testu"
                            value={result}
                            onChange={setResult}
                            options={resultOptions} />
                    </div>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="resultDate">Data i godzina wyniku testu</label>
                    <input type="datetime-local" id="resultDate" name="resultDate" value={resultDate} onChange={({ target }) => setResultDate(target.value)} className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="testType">Typ testu</label>
                    <RequiredComponent />
                    {testTypeOptions ? <div className="form-outline mb-4">
                        <Select id="testType" name="testType" placeholder="Wybierz typ testu"
                            value={testType}
                            onChange={setTestType}
                            options={testTypeOptions} />
                    </div> : <LoadingComponent />}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="place">Placówka</label>
                    <RequiredComponent />
                    <div className="d-flex justify-content-between">
                        <div className="col-11">
                            {placeOptions ?
                                <Select id="place" name="place" placeholder="Wybierz placówkę"
                                    value={place}
                                    onChange={setPlace}
                                    options={placeOptions} /> : <LoadingComponent />}
                        </div>
                        <button type="button" className="btn btn-success" onClick={() => setButtonPopup(true)}>+</button>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Dodaj test</button>
                </div>
            </form>
            <Popup component={<AddPlace onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
        </Fragment>
    );
}

export default AddTest