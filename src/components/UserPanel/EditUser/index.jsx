import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import request from "../../Request";
import Errors from "../../Errors";
import getTokenData from "../../GetTokenData";
import RequiredComponent from "../../RequiredComponent";
import { toast } from 'react-toastify';

const EditUser = (props) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roleName, setRoleName] = useState("");
    const [date, setDate] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        const handleChange = async () => {
            const urlPatient = '/api/User/userDetails/' + id
            const callback = (response) => {
                setName(response.data.name)
                setSurname(response.data.surname)
                setEmail(response.data.email)
                setPhoneNumber(response.data.phoneNumber)
                setRoleName(response.data.role)
                setDate(response.data.date)
                setIsActive(response.data.isActive)

                setError(null)
            }
            const errorCallback = (response) => {
                setError(response.data)
            }
            await request({ url: urlPatient, type: "GET" }, callback, errorCallback);
        }
        handleChange()
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/User/editUser'
        const data = {
            "id": id,
            "name": name,
            "surname": surname,
            "email": email,
            "phoneNumber": phoneNumber,
            "isActive": isActive,
            "roleName": roleName,
        }

        const callback = () => {
            props.onSubmit()
            toast.success("Zapisano zmiany!", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "PUT" }, callback, errorCallback);

    }

    const handleChange = (event) => {
        setRoleName(event.target.value)
    }

    const handleSwitch = () => {
        setIsActive(!isActive)
    }

    return (<Fragment>
        {error != null ? <Errors data={error} /> : null}
        <form onSubmit={handleSubmit}>
            <div className="pb-3 pt-3">
                <h2>Edytuj dane użytkownika</h2>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Imię</label>
                <RequiredComponent />
                <input type="text" id="name" name="name" value={name} onChange={({ target }) => setName(target.value)} required maxLength={50} className="form-control" placeholder="Podaj imię użytkownika" />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="surname">Nazwisko</label>
                <RequiredComponent />
                <input type="text" id="surname" name="surname" value={surname} onChange={({ target }) => setSurname(target.value)} required maxLength={50} className="form-control" placeholder="Podaj nazwisko użytkownika" />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Adres email</label>
                <RequiredComponent />
                <input type="email" id="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} required maxLength={254} className="form-control" placeholder="Podaj adres email użytkownika" />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="phoneNumber">Numer telefonu</label>
                <RequiredComponent />
                <input type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} maxLength={9} minLength={9} pattern={"^[0-9]{1,}$"} required className="form-control" placeholder="Podaj numer telefonu użytkownika" />
            </div>

            <div id="radio-group" className="form-outline mb-4">
                <label className="form-label" htmlFor="radio-group">Rola</label>
                <RequiredComponent />
                <div className="form-check">
                    <label className="form-check-label" htmlFor="laborant">
                        <span>Laborant</span>
                        <input className="form-check-input" value="Laborant" type="radio" name="roleName" id="laborant" checked={roleName === 'Laborant'} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="lekarz">
                        <span>Lekarz</span>
                        <input className="form-check-input" value="Lekarz" type="radio" name="roleName" id="lekarz" checked={roleName === 'Lekarz'} onChange={handleChange} />
                    </label>
                </div>
                <div className="form-check">
                    <label className="form-check-label" htmlFor="administrator">
                        <span>Administrator</span>
                        <input className="form-check-input" value="Administrator" type="radio" name="roleName" id="administrator" checked={roleName === 'Administrator'} onChange={handleChange} />
                    </label>
                </div>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="date">Data dodania</label>
                <input type="date-time" id="date" name="date" value={date} disabled={true} className="form-control" />
            </div>

            <div className="form-outline mb-4 d-flex">
                <div className="col-6">
                    <label className="form-label" htmlFor="activity">Aktywność konta</label>
                    <RequiredComponent />
                </div>
                <div className="col-6 d-flex flex-row-reverse">
                    <ReactSwitch id="activity" disabled={getTokenData().id === id} onChange={handleSwitch} checked={isActive} />
                </div>
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block">Zapisz zmiany</button>
            </div>
        </form>
    </Fragment >
    );
}

export default EditUser