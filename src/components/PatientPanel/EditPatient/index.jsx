import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import request from "../../Request";
import Select from 'react-select';
import getDataSelect from "../../../data-control/getDataSelect";
import Errors from "../../Errors";

const EditPatient = (props) => {
    const { id } = useParams()
    const [pesel, setPesel] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState("");
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
            const urlPatient = '/api/Patient/patientDetails/' + id
            const callbackPatient = (response) => {
                setPesel(response.data.pesel)
                setName(response.data.name)
                setSurname(response.data.surname)
                setSex(response.data.sex)
                setBirthDate(response.data.birthDate.split(" ")[0])
                setStreet(response.data.street)
                setAddress(response.data.address)
                setPhoneNumber(response.data.phoneNumber)
                setCity({ value: response.data.cityId, label: response.data.city })
                setCitizenship({ value: response.data.citizenshipId, label: response.data.citizenship })

                setError(null)
            }
            const errorCallback = (response) => {
                setError(response.data)
            }
            await request({ url: urlPatient, type: "GET" }, callbackPatient, errorCallback);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/Patient/editPatient'
        const data = {
            "id": id,
            "name": name,
            "surname": surname,
            "street": street,
            "address": address,
            "phoneNumber": phoneNumber,
            "cityId": city.value,
            "citizenshipId": citizenship.value,
        }
        const callback = () => {
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
            props.onSubmit()
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
                <h3>Tymczasowe edytuj pacjenta</h3>
                <input type="text" name="pesel" value={pesel} disabled={true} />
                <input type="text" name="name" value={name} onChange={({ target }) => setName(target.value)} required />
                <input type="text" name="surname" value={surname} onChange={({ target }) => setSurname(target.value)} required />
                <div>
                    <input value="F" type="radio" name="sex" id="female" checked={sex === 'F'} disabled={true} />Kobieta
                    <input value="M" type="radio" name="sex" id="male" checked={sex === 'M'} disabled={true} />Mężczyzna
                </div>
                <input type="text" name="birthDate" value={birthDate} disabled={true} />
                <input type="text" name="street" value={street} onChange={({ target }) => setStreet(target.value)} required />
                <input type="text" name="address" value={address} onChange={({ target }) => setAddress(target.value)} required />
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} required />
                {citiesOptions ? <Select required
                    value={city}
                    onChange={setCity}
                    options={citiesOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                {citizenshipsOptions ? <Select required
                    value={citizenship}
                    onChange={setCitizenship}
                    options={citizenshipsOptions} />
                    : <Select placeholder="Wczytywanie danych..." />}
                <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
            </form>
        </Fragment>
    );
}

export default EditPatient