import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
        setCurrentUser(res.data)
    };
    // eslint-disable-next-line no-unused-vars
    const logout = async(inputs) => {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, logout}}>
			{children}
		</AuthContext.Provider>
	)
}