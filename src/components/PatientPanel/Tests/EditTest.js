import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";
import RequiredComponent from "../../RequiredComponent";
import LoadingComponent from "../../LoadingComponent";
import AddPlace from "./AddPlace";
import Popup from "../../Popup";

const EditTest = (test) => {
    const [testDate, setTestDate] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [result, setResult] = useState("");
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

    useEffect(() => {
        handleChange()
    }, []);

    const handleChange = async () => {
        setTestDate(dateService(test.data.testDate))
        setResultDate(dateService(test.data.resultDate))
        if (test.data.result !== null) {
            var resultSearch = resultOptions.filter(item => item.value === test.data.result)
            setResult(resultSearch[0])
        }
        else {
            setResult(resultOptions[0])
        }
        setTestType({ value: test.data.testTypeId, label: test.data.testType })
        setOrderNumber(test.data.orderNumber)

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
        var placeSearch = arr.filter(item => item.value === test.data.placeId)
        setPlace(placeSearch[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = '/api/Test/editTest'
        var data = {
            "id": test.id,
            "testDate": testDate,
            "testTypeId": testType.value,
            "placeId": place.value,
        }

        if (result.value && resultDate) {
            data.result = result.value
            data.resultDate = resultDate
        } else if (!(result.value === '' && resultDate === '')) {
            setError({ errors: { message: ["Aby zapisać, należy podać datę wyniku i wybrać rodzaj wyniku"] } })
            return
        }

        const callback = () => {
            test.onSubmit()
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
            <form onSubmit={handleSubmit}>
                <div className="pb-3 pt-3">
                    <h2>Edytuj test</h2>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="orderNumber">Numer testu</label>
                    <input type="text" id="orderNumber" name="orderNumber" value={orderNumber} className="form-control" disabled={true} />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="testDate">Data i godzina wykonania testu</label>
                    <RequiredComponent />
                    <input type="datetime-local" id="testDate" name="testDate" value={testDate} onChange={({ target }) => setTestDate(target.value)} required className="form-control" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="result">Wynik testu</label>
                    <RequiredComponent />
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
                    <button type="submit" className="btn btn-primary btn-block">Zapisz zmiany</button>
                </div>
            </form>
            <Popup component={<AddPlace onSubmit={handleChange} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
        </Fragment>
    );
}

export default EditTest