import { Fragment } from "react";
import { Box } from "@mui/material";
import User from "./User";

const UserDetails = (user) => {
  return (
    <Fragment>
      <Box p={5}>
        <User data={user.data} showButton={false} />
      </Box>
    </Fragment>
  );
};

export default UserDetails;
