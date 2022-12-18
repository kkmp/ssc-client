import React, { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import request from "../Request";
import Select from 'react-select';
import getDataSelect from "../../data-control/getDataSelect";
import Errors from "../Errors";
import RequiredComponent from "../RequiredComponent";
import LoadingComponent from "../LoadingComponent";
import 'bootstrap/dist/css/bootstrap.css'
import { Box, Container, Typography, Stack} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";


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

        if (!city.value) {
            setError({ errors: { message: ["Aby dodać, należy wybrać miasto"] } })
            return
        }

        if (!citizenship.value) {
            setError({ errors: { message: ["Aby dodać, należy wybrać obywatelstwo"] } })
            return
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

    return (
    <Fragment>
        <Container>
            <Box>
            <Box p={3}>
                <Typography variant="h6" marginBottom={"20px"}>
                    <PersonAdd/> Dodaj pacjenta
                </Typography>
            </Box>
            
        <div className="d-flex justify-content-center">
            <div className="form-container">
                {error != null ? <Errors data={error} /> : null}
                <form onSubmit={handleSubmit}>
                    
                <Stack direction={'row'} spacing={{ xs: 4, sm: 5, md:10}} justifyContent={'center'}>
                    <Box minWidth={'250px'}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="pesel">Numer PESEL</label>
                            <RequiredComponent />
                            <input type="text" id="pesel" name="pesel" value={pesel} onChange={({ target }) => setPesel(target.value)} required maxLength={11} minLength={11} pattern={"^[0-9]{1,}$"} className="form-control" placeholder="Podaj numer PESEL pacjenta" />
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
                                    <input className="form-check-input" value="F" type="radio" name="sex" id="female" checked={sex === 'F'} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="male">
                                    <span>Mężczyzna</span>
                                    <input className="form-check-input" value="M" type="radio" name="sex" id="male" checked={sex === 'M'} onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="birthDate">Data urodzenia</label>
                            <RequiredComponent />
                            <input type="date" id="birthDate" name="birthDate" value={birthDate} onChange={({ target }) => setBirthDate(target.value)} required className="form-control" />
                        </div>

                        
                    </Box>
                    <Box minWidth={'250px'} >
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="phoneNumber">Numer telefonu</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} maxLength={9} minLength={9} pattern={"^[0-9]{1,}$"} className="form-control" placeholder="Podaj numer telefonu pacjenta" />
                        </div>

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

                        
                    </Box>

                </Stack>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Dodaj pacjenta</button>
                </div>

                    
                </form >
            </div>
        </div>
        
        </Box>
        </Container>
    </Fragment >
    );
}

export default AddPatient