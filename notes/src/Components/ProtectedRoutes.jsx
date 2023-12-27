import { useUserAuth } from "../Context/authContext";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}){
    const { user } = useUserAuth();
    if(!user) return <Navigate to={'/login'} />
    return <>{children}</>
};