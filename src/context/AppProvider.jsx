import { useContext } from "react";
import { createContext, useState } from "react";
import axiosCient from "../utils/axiosCLient";





export const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return sessionStorage.getItem("accessToken") ? true : false
    })

    const [userLogin, setUserLogin] = useState(() => {
        return localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : null
    })

    if(isLogin){
        axiosCient.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken")
    }

    return (
        <AppContext.Provider value={{ isLogin, setIsLogin, userLogin, setUserLogin }}>
            {children}
        </AppContext.Provider>
    )
}


export const useAuth = () => useContext(AppContext)

export default AppProvider