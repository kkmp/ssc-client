import React, { Fragment, useState } from "react";
import request from "../Request";
import Errors from "../Errors";

const ChangePasswordOnDemand = (props) => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/ChangePassword/changePassword';
        const newData = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        const callback = (response) => {
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: newData, type: "PUT" }, callback, errorCallback);
    }

    return (<Fragment>
        {error != null ? <Errors data={error} /> : null}
        <form onSubmit={handleSubmit}>
            Zmiana hasła:
            <input type="password" name="oldPassword" value={oldPassword} onChange={({ target }) => setOldPassword(target.value)} required />
            <input type="password" name="newPassword" value={newPassword} onChange={({ target }) => setNewPassword(target.value)} required />
            <button type="submit">Zmień hasło</button>
            <button onClick={props.onClose}>X</button>
        </form>
    </Fragment>
    );
}

export default ChangePasswordOnDemand