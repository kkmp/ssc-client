import React from "react";
import { useState, Fragment } from "react";
import request from "../Request";
import Errors from "../Errors";

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/ChangePassword/getCode'
        const data = {
            "email": email,
        }
        const callback = () => {
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: data, type: "POST" }, callback, errorCallback, false);
    }

    return (
        <Fragment>
            {error != null ? <Errors data={error} /> : null}
            <h1>Zmiana hasła </h1>
            Podaj adres email powiązany z Twoim kontem, a pomożemy Ci zmienić hasło.
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                <button type="submit">Wyślij dalsze instrukcje</button>
            </form>
        </Fragment>
    );
};

export default ChangePassword