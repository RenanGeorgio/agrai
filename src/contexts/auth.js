import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'

const AuthContextdata = {
    signed : false,
    client : {},
    signIn: ({value}) => {},
    signOut: () => {},
    signUp: ({value}) => {}
};

const AuthContext = createContext(AuthContextdata);

export const AuthProvider = ({children}) => {
    const [client, setClient] = useState({});
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function loadStoragedData(){
            const storagedUsername = await AsyncStorage.getItem('@sypplyfy_driver:client');
            const storagedToken = await AsyncStorage.getItem('@sypplyfy_driver:token');
            const storagedCookie = await AsyncStorage.getItem('@sypplyfy_driver:cookie');
            const storagedStatus = await AsyncStorage.getItem('@sypplyfy_driver:signed');

            if(storagedToken && storagedStatus && storagedUsername){
                setClient(JSON.parse(storagedUsername));
            }
        }

        loadStoragedData();
    }, []);

    async function signIn(value) {
        setClient(value);
        setSigned(true);

        await AsyncStorage.setItem('@sypplyfy_driver:client', JSON.stringify(value));
        await AsyncStorage.setItem('@sypplyfy_driver:token', value.token);
        await AsyncStorage.setItem('@sypplyfy_driver:cookie', value.cookie);
        await AsyncStorage.setItem('@sypplyfy_driver:signed', JSON.stringify(signed));

        return JSON.stringify(signed);
    }

    async function signUp(value) { 
        setClient(value);
        setSigned(true);

        await AsyncStorage.setItem('@sypplyfy_driver:client', JSON.stringify(value));
        await AsyncStorage.setItem('@sypplyfy_driver:token', value.token);
        await AsyncStorage.setItem('@sypplyfy_driver:cookie', value.cookie);
        await AsyncStorage.setItem('@sypplyfy_driver:signed', JSON.stringify(signed));

        return JSON.stringify(signed);
    }

    async function signOut() {
        await AsyncStorage.clear().then(() => {
            setClient({});
            setSigned(false);

            return true;
        });
    }

    return(
        <AuthContext.Provider value={{ signed, client, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;