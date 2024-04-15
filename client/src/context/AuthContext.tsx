import {createContext, useEffect, useState} from "react";

import axios from "axios";


export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')!)
    );

    async function login(loginCredentials) {
        const response = await axios.post('http://localhost:8800/api/auth/login', loginCredentials, {
            withCredentials: true,
        });

        setCurrentUser(response.data);
    }

    function updateCredentials(profileImageFile: string | null, bgImageFile: string | null) {
        setCurrentUser(prevState => ({...prevState, pPicture: profileImageFile, bgPicture: bgImageFile}));
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser]);

    return <AuthContext.Provider value={{currentUser, login, updateCredentials}}>
        {props.children}
    </AuthContext.Provider>
}