import { Fragment } from "react"
import User from "./User";

const UserDetails = (user) => {

    return (
        <Fragment>
            <User data={user.data} showButton={false} />
            {user.data.date}
        </Fragment>
    );
}

export default UserDetails