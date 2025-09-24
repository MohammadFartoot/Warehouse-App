import {createContext, useContext, useReducer} from "react";
import {initialState, authReducer} from "./authReducer.js";


export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}

function AuthProvider({children}) {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const openAlertModal = () => {
        dispatch({type: "OPEN_ALERT_MODAL"})
    }

    const closeAlertModal = () => {
        dispatch({type: "CLOSE_ALERT_MODAL"})
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            dispatch,
            openAlertModal,
            closeAlertModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;