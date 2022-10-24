import { Fragment } from "react"
import { Shield, Clipboard2Pulse, Eyedropper } from "react-bootstrap-icons";
import './UserAvatar.css'
import {Stack} from "@mui/material";

const UserAvatar = (user) => {
    const showRoleIcon = () => {
        switch (user.data.userRole) {
            case "Administrator":
                return <Shield />
            case "Lekarz":
                return <Clipboard2Pulse />
            case "Laborant":
                return <Eyedropper />
            default:
                break
        }
    }

    return (
        <Fragment>
            <div className="box">
                {showRoleIcon()} {user.data.userName} {user.data.userSurname} {user.data.userEmail}
            </div>
        </Fragment>
    );
}

export default UserAvatar