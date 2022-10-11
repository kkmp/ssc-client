import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../../Request";
import Errors from "../../Errors";
import dateService from "../../DateService";
import Select from "react-select";
import getDataSelect from "../../../data-control/getDataSelect";

const EditTest = (test) => {
    const [testDate, setTestDate] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [result, setResult] = useState("");
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

    useEffect(() => {
        const handleChange = () => {
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
            //setPlace(test.data.place) //SPECJALNY KOMPONENT
            setOrderNumber(test.data.orderNumber)

            const urlTestType = '/api/Data/getTestTypes'
            getDataSelect(urlTestType).then((result) => {
                setTestTypeOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = '/api/Test/editTest'
        var data = {
            "id": test.id,
            "testDate": testDate,
            "testTypeId": testType.value,
            "placeId": "4c88f393-160c-4fa0-ac47-3130fc798c0f" //tymczasowo!!!!
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
            <form onSubmit={handleSubmit} className="mt-5">
                <h3>Edytuj test</h3>
                <input type="text" name="orderNumber" value={orderNumber} disabled={true} />
                <input type="datetime-local" name="testDate" value={testDate} onChange={({ target }) => setTestDate(target.value)} required />
                <Select required name="result" value={result} onChange={setResult} options={resultOptions} placeholder="Wybierz wynik lub pozostaw pusty" />
                <input type="datetime-local" name="resultDate" value={resultDate} onChange={({ target }) => setResultDate(target.value)} />
                {testTypeOptions ? <Select required
                    value={testType}
                    onChange={setTestType}
                    options={testTypeOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                {/* <input type="text" name="place" value={place} onChange={({ target }) => setPlace(target.value)} required />*/}
                <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
            </form>
        </Fragment>
    );
}

export default EditTest