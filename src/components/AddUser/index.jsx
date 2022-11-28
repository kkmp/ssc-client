import React, { Fragment, useState } from "react";
import request from "../Request";
import Errors from "../Errors";
import { toast } from 'react-toastify';
import RequiredComponent from "../RequiredComponent";
import '../Styles.css'
import Popup from '../Popup'
import CopyPassword from "./CopyPassword";

const AddUser = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roleName, setRoleName] = useState("Laborant");
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false)

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
            toast.success("Dodano nowego użytkownika!", { position: toast.POSITION.BOTTOM_RIGHT });
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

    return (<Fragment>
        <div className="d-flex justify-content-center">
            <div className="form-container">
                {error != null ? <Errors data={error} /> : null}

                {data != null ? <div className="text-center">
                    <button type="button" className="btn btn-info" onClick={() => setButtonPopup(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                    </button>
                </div> : null}

                <form onSubmit={handleSubmit}>
                    <div className="pb-3 pt-3">
                        <h2>Nowy użytkownik</h2>
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

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block">Dodaj użytkownika</button>
                    </div>
                </form>
            </div>
        </div>
        <Popup component={<CopyPassword data={data} />} trigger={buttonPopup} setTrigger={setButtonPopup} />
    </Fragment>
    );
}

export default AddUser