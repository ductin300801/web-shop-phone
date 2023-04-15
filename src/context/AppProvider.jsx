import { useContext } from "react";
import { createContext, useState } from "react";





export const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return sessionStorage.getItem("accessToken") ? true : false
    })

    const [userLogin, setUserLogin] = useState(() => {
        return localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : null
    })

    return (
        <AppContext.Provider value={{ isLogin, setIsLogin, userLogin, setUserLogin }}>
            {children}
        </AppContext.Provider>
    )
}


export const useAuth = () => useContext(AppContext)

export default AppProvider