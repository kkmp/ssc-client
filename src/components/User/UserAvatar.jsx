import { Fragment } from "react";

import "./UserAvatar.css";
import {
  AdminPanelSettings,
  Science,
  HealthAndSafety,
} from "@mui/icons-material";

const UserAvatar = (user) => {
  const showRoleIcon = () => {
    switch (user.data.userRole) {
      case "Administrator":
        return <AdminPanelSettings />;
      case "Lekarz":
        return <Science />;
      case "Laborant":
        return <HealthAndSafety />;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <div className="box">
        {showRoleIcon()} {user.data.userName} {user.data.userSurname}{" "}
        {user.data.userEmail}
      </div>
    </Fragment>
  );
};

export default UserAvatar;
