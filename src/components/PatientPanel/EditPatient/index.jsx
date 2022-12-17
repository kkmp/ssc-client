import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import request from "../../Request";
import Select from 'react-select';
import getDataSelect from "../../../data-control/getDataSelect";
import Errors from "../../Errors";
import RequiredComponent from "../../RequiredComponent";
import LoadingComponent from "../../LoadingComponent";
import { Box, Stack } from "@mui/material";

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
            <Box>
            <form onSubmit={handleSubmit}>
                <Box>
                    <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                        <div className="pb-3 pt-3">
                            <h2>Edytuj dane pacjenta</h2>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="pesel">Numer PESEL</label>
                            <input type="text" id="pesel" name="pesel" value={pesel} disabled={true} className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Imię</label>
                            <RequiredComponent />
                            <input type="text" id="name" name="name" value={name} onChange={({ target }) => setName(target.value)} required maxLength={50} className="form-control" placeholder="Podaj imię pacjenta" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="surname">Nazwisko</label>
                            <RequiredComponent />
                            <input type="text" id="surname" name="surname" value={surname} onChange={({ target }) => setSurname(target.value)} required maxLength={50} className="form-control" placeholder="Podaj nazwisko pacjenta" />
                        </div>

                        <div id="radio-group" className="form-outline mb-4">
                            <label className="form-label" htmlFor="radio-group">Płeć</label>
                            <RequiredComponent />
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="female">
                                    <span>Kobieta</span>
                                    <input className="form-check-input" value="F" type="radio" name="sex" id="female" checked={sex === 'F'} disabled={true} />
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="male">
                                    <span>Mężczyzna</span>
                                    <input className="form-check-input" value="M" type="radio" name="sex" id="male" checked={sex === 'M'} disabled={true} />
                                </label>
                            </div>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="birthDate">Data urodzenia</label>
                            <input type="text" id="birthDate" name="birthDate" value={birthDate} disabled={true} className="form-control" />
                        </div>
                    </Stack>
                    <Stack direction={"column"} spacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="street">Ulica</label>
                        <RequiredComponent />
                        <input type="text" id="street" name="street" value={street} onChange={({ target }) => setStreet(target.value)} required maxLength={50} className="form-control" placeholder="Podaj ulicę" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="address">Numer domu{'/'}mieszkania</label>
                        <RequiredComponent />
                        <input type="text" id="address" name="address" value={address} onChange={({ target }) => setAddress(target.value)} required maxLength={10} className="form-control" placeholder="Podaj numer domu/mieszkania" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="phoneNumber">Numer telefonu</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} maxLength={9} minLength={9} pattern={"^[0-9]{1,}$"} className="form-control" placeholder="Podaj numer telefonu pacjenta" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="city">Miasto</label>
                        <RequiredComponent />
                        {citiesOptions ? <div className="form-outline">
                            <Select id="city" name="city" required placeholder="Wybierz miasto"
                                value={city}
                                onChange={setCity}
                                options={citiesOptions} />
                        </div> : <LoadingComponent />}
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="citizenship">Obywatelstwo</label>
                        <RequiredComponent />
                        {citizenshipsOptions ? <div className="form-outline">
                            <Select id="citizenship" name="citizenship" required placeholder="Wybierz obywatelstwo"
                                value={citizenship}
                                onChange={setCitizenship}
                                options={citizenshipsOptions} />
                        </div> : <LoadingComponent />}
                    </div>
                    </Stack>
                </Box>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Zapisz zmiany</button>
                </div>
            </form>
            </Box>
     
        </Fragment>
    );
}

export default EditPatient