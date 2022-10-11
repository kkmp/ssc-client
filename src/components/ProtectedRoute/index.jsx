import getTokenData from "../GetTokenData";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, redirect, children }) => {
    const data = getTokenData()
    let redirectTo = "/unauthorized"
    if(redirect !== undefined)
    {
        redirectTo = redirect;
    }

    
    if (data == null || !roles.includes(data.role)) {
      return <Navigate to={redirectTo} replace />;
    }
  
    return children;
  };

  export default ProtectedRoute