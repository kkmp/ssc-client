import React from "react";
import { useState } from "react";
import request from "../Request";
import Errors from "../Errors"
import { Container } from "@mui/material";

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/ChangePassword/getCode'
        const data = {
            "email": email
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
        <Container>
            {error != null ? <Errors data={error} /> : null}

            <div className="container pt-5 mt-5">
            <div className="row">
                
                <section className="login-logo mb-5 text-center">
                    <h1>Zmiana hasła</h1>
                </section>
                <div>
                    {error ? error.map((err, idx) => <Errors message={err} key={idx} />): null}
                </div>
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group pb-2">
                            {/*Dlaczego nie jest wyswietlany blad?*/ console.log(error)}
                            <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} required/>
                        </div>
                        <button type="submit" id="signin" className="btn btn-primary w-100 my-3 py-2">Wyślij Email</button>
                        
                    </form>
                    <div className="text-center mt-1">
                            <p>Powrót do logowania <a className="text-decoration-none link-success fw-bold" href="/Login">Wróć</a></p>
                    </div>
                </div>
            </div>
        </div>
        
        </Container>
        
    );
};

export default ChangePassword