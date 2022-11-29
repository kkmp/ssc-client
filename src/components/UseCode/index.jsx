import React from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom'
import request from "../Request";
import Errors from "../Errors";
import { Container } from "@mui/system";
import { toast } from 'react-toastify';

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
            toast.success("Hasło zostało zmienione", { position: toast.POSITION.BOTTOM_RIGHT });
            setError(null)
            
        }
        const errorCallback = (response) => {
            toast.error("Błąd hasła", { position: toast.POSITION.BOTTOM_RIGHT });

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
                <h1>Utwórz nowe hasło</h1>
            </section>
            <div>
                {error ? error.map((err, idx) => <Errors message={err} key={idx} />): null}
            </div>
            <div className="col-6 offset-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-2">
                        {/*Hasło*/}
                        <input type="password" name="password" className="form-control" placeholder="Wprowadź nowe hasło" value={password} onChange={({ target }) => setPassword(target.value)} required/>
                    </div>
                    <button type="submit" id="signin" className="btn btn-primary w-100 my-3 py-2">Zmień hasło</button>
                    
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

export default UseCode