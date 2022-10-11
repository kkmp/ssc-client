import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import request from "../Request";
import UserDetails from "../User/UserDetails";
import Errors from "../Errors";
import getTokenData from "../GetTokenData";
import EditUser from "./EditUser";

const UserPanel = () => {
    const [data, setData] = useState([])
    const [showEditUser, setShowEditUser] = useState(false)
    const [error, setError] = useState(null);
    const [changed, setChanged] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        const handleChange = async () => {
            const url = '/api/User/userDetails/' + id;
            const callback = (response) => {
                var newDataArr = response.data;
                setData(newDataArr)
                setError(null)
            }
            const errorCallback = (response) => {
                setError(response.data)
            }
            await request({ url: url, type: "GET" }, callback, errorCallback);
        }
        handleChange()
    }, [changed]);

    const handleOnClick = () => {
        setShowEditUser(!showEditUser)
        setChanged(!changed)
    }

    const changeActivity = async () => {
        var activity = null
        if (data.isActive) {
            activity = "deactivate"
        } else {
            activity = "activate"
        }
        const url = '/api/User/changeActivity/' + activity;
        const newData = {
            "id": id
        }
        const callback = () => {
            setError(null)
        }
        const errorCallback = (response) => {
            setError(response.data)
        }
        await request({ url: url, data: newData, type: "PUT" }, callback, errorCallback);
        setChanged(!changed)
    }

    return (
        error != null ? <Errors data={error} /> :
            <Fragment>
                <UserDetails data={data} />
                <button onClick={handleOnClick}>Edytuj dane</button>
                {showEditUser ? <EditUser /> : ""}
                <button disabled={getTokenData().id === id} onClick={changeActivity}>{data.isActive ? "Dezaktywuj konto" : "Aktywuj konto"}</button>
            </Fragment>
    );
}

export default UserPanel