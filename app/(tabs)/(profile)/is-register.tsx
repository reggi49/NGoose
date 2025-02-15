import React, { useState, useEffect, useContext } from 'react';
import ProfileScreen from '@/app/(tabs)/(profile)/index';
import LoginScreen from '@/app/(tabs)/(profile)/login';
import { CredentialsContext } from '@/components/helper/CredentialsContext';

export default function IsRegister() {
    const [login, setLogin] = useState(false);

    const { storedCredentials, setStoredCredentials } =
        useContext(CredentialsContext);

    const checkLogin = () => {
        if (storedCredentials) {
            console.log('login');
            setLogin(true);
        } else {
            console.log('tdk login');
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    if (!login) {
        return <LoginScreen></LoginScreen>;
    } else {
        return <ProfileScreen></ProfileScreen>;
    }
}
