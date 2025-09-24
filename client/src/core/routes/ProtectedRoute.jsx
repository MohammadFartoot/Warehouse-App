import {getCookie} from "../utils/cookie.js";
import {useEffect} from "react";
import {useAuth} from "../../modules/auth/index.js";



function ProtectedRoute({children}) {

    const {openAlertModal} = useAuth();
    const token = getCookie("token");


    const isAuthenticated = !!token;

    useEffect(() => {
        if (!isAuthenticated) {
            openAlertModal();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) return null;



    return children;
}

export default ProtectedRoute;