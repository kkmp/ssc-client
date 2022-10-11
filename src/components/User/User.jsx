import { Fragment } from "react"
import { Shield, Clipboard2Pulse, Eyedropper } from "react-bootstrap-icons";

const User = (user) => {
    const showRoleIcon = () => {
        switch (user.data.role) {
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

    const showActivity = () => {
        if (user.data.isActive === true) {
            return "Aktywny"
        }
        return "Nieaktywny"
    }

    const handleAction = (id) => {
        window.location = '/user/' + id
    }

    return (
        <Fragment>
            <div>
                {showRoleIcon()} {user.data.name} {user.data.surname} {user.data.email} {user.data.phone} {showActivity()}
                {user.showButton ? <button onClick={() => handleAction(user.data.id)}>Szczegóły</button> : ""}
            </div>
        </Fragment>
    );
}

export default User