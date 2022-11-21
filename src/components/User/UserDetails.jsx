import { Fragment } from "react"
import { Box } from "@mui/material";
import User from "./User";

const UserDetails = (user) => {

    return (
        <Fragment>
            <Box>
            <User data={user.data} showButton={false} />
             {/*przeksztalcic w jeden komponent */}
            </Box>
        </Fragment>
    );
}

export default UserDetails