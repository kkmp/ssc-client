import React from "react";
import { useState, Fragment } from "react";
import { useParams } from 'react-router-dom'
import request from "../Request";
import Errors from "../Errors";

const UseCode = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { code } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/ChangePassword/byCode/'
        const data = {
            "password": password,
            "code": code
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
            <h1>Utwórz nowe hasło </h1>
            Wprowadź swoje nowe hasło
            <br></br>
            <form onSubmit={handleSubmit}>
                <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                <button type="submit">Zmień hasło</button>
            </form>
        </Fragment>
    );
};

export default UseCode