import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({user, children}) => {
    
    if (!user) {
        return <Navigate to="/" />
    }
    
    return children ? children : <Outlet />

}

export default ProtectedRoute;
