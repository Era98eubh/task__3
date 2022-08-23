import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth,setAuth } = useAuth();
    const location = useLocation();
    
   

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/userlogin" state={{ from: location }} replace />
    );
}

export default RequireAuth;