import { createContext, useState } from "react";





export const AppContext = createContext()


const AppProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return sessionStorage.getItem("accessToken") ? true : false
    })

    return (
        <AppContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider