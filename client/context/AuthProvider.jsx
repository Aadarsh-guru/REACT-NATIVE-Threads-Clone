import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {

    const navigation = useNavigation();
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const localData = async () => {
            const data = await AsyncStorage.getItem('@auth')
            const parsedData = JSON.parse(data)
            setAuth({ ...auth, user: parsedData?.user, token: parsedData?.token })
        }
        localData();
    }, [])


    useEffect(() => {
        const protect = () => {
            if (auth?.token === '') {
                navigation.navigate('Login')
            }
        }
        protect();
    }, [auth?.token])

    axios.defaults.headers.common['Authorization'] = auth?.token;
    axios.defaults.baseURL = 'https://icslrzntzl.execute-api.ap-south-1.amazonaws.com'

    return (
        <AuthContext.Provider value={{
            auth, setAuth
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider