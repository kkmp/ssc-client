import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import request from "../../Request";
import Errors from "../../Errors";
import getTokenData from "../../GetTokenData";

const EditUser = () => {
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
        <form onSubmit={handleSubmit} className="mt-5">
            <h3>Tymczasowe dodaj użytkownika</h3>
            <input type="text" name="name" value={name} onChange={({ target }) => setName(target.value)} required />
            <input type="text" name="surname" value={surname} onChange={({ target }) => setSurname(target.value)} required />
            <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} required />
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} required />
            <div>
                <input value="Laborant" type="radio" name="roleName" id="laborant" checked={roleName === 'Laborant'} onChange={handleChange} />Laborant
                <input value="Lekarz" type="radio" name="roleName" id="lekarz" checked={roleName === 'Lekarz'} onChange={handleChange} />Lekarz
                <input value="Administrator" type="radio" name="roleName" id="administrator" checked={roleName === 'Administrator'} onChange={handleChange} />Administrator
            </div>
            <input type="text" name="date" value={date} disabled={true} />
            <ReactSwitch disabled={getTokenData().id === id} onChange={handleSwitch} checked={isActive} />
            <button type="submit" className="btn btn-primary btn-lg w-100">Zapisz zmiany</button>
        </form>
    </Fragment>
    );
}

export default EditUser