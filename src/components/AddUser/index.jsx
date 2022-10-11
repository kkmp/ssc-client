import React, { Fragment, useState } from "react";
import request from "../Request";
import Errors from "../Errors";
import {toast} from 'react-toastify';

const AddUser = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roleName, setRoleName] = useState("Laborant");
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/User/addUser'
        const data = {
            "name": name,
            "surname": surname,
            "email": email,
            "phoneNumber": phoneNumber,
            "roleName": roleName,
        }
        const callback = (response) => {
            setData(response.data.message)
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
            setData(null)
        }
        await request({ url: url, data: data, type: "POST" }, callback, errorCallback);
    }

    const handleChange = (event) => {
        setRoleName(event.target.value)
    }

    const copyToClipboard = () => {
        var text = document.getElementById("password")
        navigator.clipboard.writeText(text.value);
        toast('Skopiowano hasło do schowka',{position: toast.POSITION.TOP_RIGHT})
    }

    return (<Fragment>
        {error != null ? <Errors data={error} /> : null}
        {data != null ? <Fragment>
            Utworzono użytkownika z następującym hasłem: 
            <input type="text" id="password" value={data} readOnly/>
            <button type="submit" onClick={copyToClipboard}>Kopiuj do schowka</button>
            </Fragment> : null}
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
            <button type="submit" className="btn btn-primary btn-lg w-100">Dodaj pacjenta</button>
        </form>
    </Fragment>
    );
}

export default AddUser