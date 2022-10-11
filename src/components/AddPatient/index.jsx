import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../Request";
import Select from 'react-select';
import getDataSelect from "../../data-control/getDataSelect";
import Errors from "../Errors";

const AddPatient = () => {
    const [pesel, setPesel] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState("F");
    const [birthDate, setBirthDate] = useState("");
    const [street, setStreet] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [citiesOptions, setCitiesOptions] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [citizenshipsOptions, setCitizenshipsOptions] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleChange = async () => {
            const urlCity = '/api/Data/getCities'
            getDataSelect(urlCity).then((result) => {
                setCitiesOptions(result)
            })

            const urlCitizenship = '/api/Data/getCitizenships'
            getDataSelect(urlCitizenship).then((result) => {
                setCitizenshipsOptions(result)
            })
        }
        handleChange()
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const url = '/api/PAtient/addPatient'
        const data = {
            "pesel": pesel,
            "name": name,
            "surname": surname,
            "sex": sex,
            "birthDate": birthDate,
            "street": street,
            "address": address,
            "phoneNumber": phoneNumber,
            "cityId": city.value,
            "citizenshipId": citizenship.value,
        }
        const callback = () => {
            toast.success("Pacjent został dodany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "POST" }, callback, errorCallback);
    }

    const handleChange = (event) => {
        setSex(event.target.value)
    }

    return (<Fragment>
        { error != null ? <Errors data={error} /> : null}
        <form onSubmit={handleSubmit} className="mt-5">
            <h3>Tymczasowe dodaj pacjenta</h3>
            <input type="text" name="pesel" value={pesel} onChange={({ target }) => setPesel(target.value)} required />
            <input type="text" name="name" value={name} onChange={({ target }) => setName(target.value)} required />
            <input type="text" name="surname" value={surname} onChange={({ target }) => setSurname(target.value)} required />
            <div>
                <input value="F" type="radio" name="sex" id="female" checked={sex === 'F'} onChange={handleChange} />Kobieta
                <input value="M" type="radio" name="sex" id="male" checked={sex === 'M'} onChange={handleChange} />Mężczyzna
            </div>
            <input type="date" name="birthDate" value={birthDate} onChange={({ target }) => setBirthDate(target.value)} required />
            <input type="text" name="street" value={street} onChange={({ target }) => setStreet(target.value)} required />
            <input type="text" name="address" value={address} onChange={({ target }) => setAddress(target.value)} required />
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} required />
            {citiesOptions ? <Select required placeholder="Wybierz miasto"
                value={city}
                onChange={setCity}
                options={citiesOptions} />
                : <Select placeholder="Wczytywanie danych..." />}
            {citizenshipsOptions ? <Select required placeholder="Wybierz obywatelstwo"
                value={citizenship}
                onChange={setCitizenship}
                options={citizenshipsOptions} />
                : <Select placeholder="Wczytywanie danych..." />}
            <button type="submit" className="btn btn-primary btn-lg w-100">Dodaj pacjenta</button>
        </form>
    </Fragment>
    );
}

export default AddPatient