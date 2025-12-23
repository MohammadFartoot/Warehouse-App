import {createContext, useContext, useEffect, useReducer} from "react";
import {initialState, themeReducer} from "./themeReducer.js";


export const ThemeContext = createContext();
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}

const init = () => {
    const savedTheme = localStorage.getItem("theme");
    return { ...initialState, theme: savedTheme ? savedTheme : initialState.theme };
};

function ThemeProvider({children}) {

    const [state, dispatch] = useReducer(themeReducer, initialState, init);

    const themeHandler = () => {
        dispatch({type: "TOGGLE_THEME"})
    }

    useEffect(() => {
        document.body.className = state.theme === "dark" ? "darkMode" : "";
        localStorage.setItem("theme", state.theme);
    }, [state.theme]);

    return (
        <ThemeContext.Provider value={{...state, dispatch, themeHandler}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;