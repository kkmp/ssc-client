import { Fragment } from "react"
import { Box } from "@mui/material";
import User from "./User";

const UserDetails = (user) => {

    return (
        <Fragment>
            <Box p={3}>
            <User data={user.data} showButton={false} />
                {user.data.date} {/*przeksztalcic w jeden komponent */}
            </Box>
        </Fragment>
    );
}

export default UserDetails