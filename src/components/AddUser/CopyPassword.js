import React, { Fragment } from "react";
import { toast } from 'react-toastify';

const CopyPassword = (props) => {

    const copyToClipboard = () => {
        var text = document.getElementById("password")
        navigator.clipboard.writeText(text.value);
        toast('Hasło zostało skopiowane do schowka!', { position: toast.POSITION.BOTTOM_RIGHT })
    }

    return (
        <Fragment>
            <div className="pb-3 pt-3">
                <h2>Hasło nowego użytkownika</h2>
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Utworzono użytkownika z następującym hasłem:</label>
                <input type="text" id="password" name="password" value={props.data} className="form-control" readOnly />
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-info" onClick={copyToClipboard}>Kopiuj do schowka</button>
            </div>
        </Fragment>
    );
}

export default CopyPassword