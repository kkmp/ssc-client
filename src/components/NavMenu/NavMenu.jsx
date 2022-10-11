import React, { useEffect, useState } from "react";
import getTokenData from "../GetTokenData";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const NavMenu = () => {
    const [show, setShow] = useState(true)
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    useEffect(() => {
        var excetpions = ["login", "changePassword"];
        if (excetpions.indexOf(window.location.pathname.split('/')[1]) > -1) {
            setShow(false)
            return;
        }
        const data = getTokenData()
        if (data != null) {
            setName(data.name)
            setSurname(data.surname)
            setRole(data.role)
        }
    }, [])

    return (
        show ? <div>
            MENU
            <br></br>
            {name}<br></br>{surname}<br></br>{role}<br></br>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/addPatient"}>Add patient</Link>
                </li>
                <li>
                    <Link to={"/searchPatient"}>Search patient</Link>
                </li>
                {role == "Administrator" ?
                    <Fragment>
                        <li>
                            <Link to={"/searchUser"}>Search user</Link>
                        </li>
                        <li>
                            <Link to={"/addUser"}>Add user</Link>
                        </li>
                    </Fragment> : null
                }
            </ul>



        </div> : <div></div>
    );
}

export default NavMenu