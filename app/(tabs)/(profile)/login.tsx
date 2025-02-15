import React, { useState, useContext } from 'react';
import {
    StyledContainer,
    PageLogo,
    PageTitle,
    StyledButton,
    ButtonText,
    MsgBox,
    ExtraView,
    ExtraText,
    LoginBackground,
    LoginView,
    SocialButtonView,
    TextLink,
    TextLinkContent,
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { View, ActivityIndicator, Platform } from 'react-native';
import { Formik } from 'formik';
import TextBox from '@/components/TextBox';
import KeyboardWrapper from '@/components/ui/KeyboardWrapper';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { CredentialsContext } from '@/components/helper/CredentialsContext';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
    offlineAccess: true,
    androidClientId:
        '745656310654-5r6r7oc0vre3hjn0ddiv5e7p33dthhg4.apps.googleusercontent.com',
    webClientId:
        '745656310654-6l4kqort3nhndbuuh37t1l0clq3or672.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
});

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [appleSubmitting, setAppleSubmitting] = useState(false);
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [facebookSubmitting, setFacebookSubmitting] = useState(false);

    const navigation = useNavigation();

    const { storedCredentials, setStoredCredentials } =
        useContext(CredentialsContext);

    const logOff = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    function handleLogin(credentials, setSubmitting) {
        handleMessage(null);
        auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                const uid = response.user.uid;
                const usersRef = firestore().collection('users');
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            handleMessage('User Tidak Ditemukan');
                            setSubmitting(false);
                            return;
                        }
                        const user = firestoreDocument.data();
                        // console.log(user);
                        // console.log('User logged-in successfully!');
                        // console.log('handle login');
                        // console.log(user);
                        persistLogin({ ...user }, 'Login Successfully');
                        setSubmitting(false);
                    })
                    .catch(error => {
                        handleMessage(error.message);
                        setSubmitting(false);
                    });
            })
            .catch(error => {
                setSubmitting(false);
                handleMessage(error.message);
                console.log({ errorMessage: error.message });
            });
    }

    async function onGoogleButtonPress() {
        setGoogleSubmitting(true);
        try {
            await GoogleSignin.hasPlayServices();

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth()
                .signInWithCredential(googleCredential)
                .then(response => {
                    handleMessage('google signing');
                    // console.log(response);
                    const uid = response.user.uid;
                    const { user } = response;
                    const { email, displayName, photoUrl } = user;
                    const data = {
                        id: uid,
                        email: email,
                        name: displayName,
                        password: uid,
                    };
                    const usersRef = firestore().collection('users');
                    usersRef
                        .doc(uid)
                        .set(data)
                        .then(() => {
                            // handleMessage('User registered successfully!');
                            setGoogleSubmitting(false);
                            persistLogin(
                                { ...data },
                                handleMessage('Google signin successful'),
                            );
                        })
                        .catch(error => {
                            handleMessage(error);
                        });
                })
                .catch(error => {
                    handleMessage(
                        'An error occurred on auth. Check your network and try again',
                    );
                    console.log(error);
                    setGoogleSubmitting(false);
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                handleMessage('Signin Canceled');
                setGoogleSubmitting(false);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                handleMessage('Signin in progress');
                setGoogleSubmitting(false);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                handleMessage('PLAY_SERVICES_NOT_AVAILABLE');
                setGoogleSubmitting(false);
            } else {
                handleMessage('An error occurred on auth, try again.');
                setGoogleSubmitting(false);
                console.log(error);
            }
        }
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
        ]);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken,
        );

        // Sign-in the user with the credential
        return auth()
            .signInWithCredential(facebookCredential)
            .then(response => {
                const uid = response.user.uid;
                console.log('facebook login');
                console.log(response);
                const { additionalUserInfo } = response;
                const { email, name, photoUrl } = additionalUserInfo.profile;
                const data = {
                    id: uid,
                    email: email,
                    name: name,
                    password: uid,
                };
                const usersRef = firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        console.log('User registered successfully!');
                        setFacebookSubmitting(false);
                        persistLogin({ ...data }, message, 'SUCCESS');
                        // navigation.navigate('Home', {user: data});
                    })
                    .catch(error => {
                        handleMessage(error);
                    });
            })
            .catch(error => {
                handleMessage('An error occurred. Check your network and try again');
                console.log(error);
                setFacebookSubmitting(false);
            });
    }

    async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
        );

        // use credentialState response to ensure the user is authenticated
        return auth()
            .signInWithCredential(appleCredential)
            .then(response => {
                const uid = response.user.uid;
                console.log('apple login');
                console.log(response);
                const { user } = response;
                const { email, displayName, photoUrl } = user;
                const data = {
                    id: uid,
                    email: email,
                    name: displayName,
                    password: uid,
                };
                const usersRef = firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        console.log('User registered successfully!');
                        setAppleSubmitting(false);
                        persistLogin({ ...data }, message, 'SUCCESS');
                    })
                    .catch(error => {
                        handleMessage(error);
                    });
            })
            .catch(error => {
                handleMessage('An error occurred. Check your network and try again');
                console.log(error);
                setAppleSubmitting(false);
            });
    }
    // Persisting login
    const persistLogin = (credentials, message) => {
        AsyncStorage.setItem('AGooseCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message);
                setStoredCredentials(credentials);
                navigation.replace('Home');
            })
            .catch(error => {
                handleMessage('Persisting login failed');
                console.log(error);
            });
    };

    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <KeyboardWrapper>
            <StyledContainer>
                <LoginBackground source={require('../assets/img/bg-login.png')}>
                    <PageLogo source={require('../assets/img/logo-app.png')} />
                </LoginBackground>
                <LoginView>
                    <View style={{ padding: 20 }}>
                        <PageTitle>Selamat Datang</PageTitle>
                        <ExtraView>
                            <ExtraText>Tidak punya akun? </ExtraText>
                            <TextLink
                                // onPress={() =>
                                //     navigation.navigate('Signup', {
                                //         data: 'daftar',
                                //     })
                                // }
                                >
                                <TextLinkContent>Daftar</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.email == '' || values.password == '') {
                                    handleMessage('Silahkan Masukan Email dan Password');
                                    setSubmitting(false);
                                } else {
                                    handleLogin(values, setSubmitting);
                                }
                            }}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                isSubmitting,
                            }) => (
                                <View style={{ flex: 1 }}>
                                    <TextBox
                                        label="Email Address"
                                        textColor={Colors.lightGray}
                                        placeholder="emailmu@gmail.com"
                                        placeholderTextColor={Colors.lightGray}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                        icon="mail-outline"
                                    />
                                    <TextBox
                                        label="Password"
                                        textColor={Colors.lightGray}
                                        placeholder="* * * * * * *"
                                        placeholderTextColor={Colors.lightGray}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        icon="key-outline"
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <MsgBox type={messageType}>{message}</MsgBox>

                                    {!isSubmitting && (
                                        <StyledButton login={true} onPress={handleSubmit}>
                                            <ButtonText>Login</ButtonText>
                                        </StyledButton>
                                    )}
                                    {isSubmitting && (
                                        <StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={Colors.primary} />
                                        </StyledButton>
                                    )}
                                    <View style={{ flex: 1 }}>
                                        <ExtraView>
                                            <TextLink
                                                // onPress={() =>
                                                //     navigation.navigate('Signup', {
                                                //         data: 'forget',
                                                //     })
                                                // }
                                                >
                                                <TextLinkContent>Lupa password?</TextLinkContent>
                                            </TextLink>
                                            <ExtraText> atau login dengan</ExtraText>
                                        </ExtraView>
                                        <SocialButtonView>
                                            {/* <StyledButton>
                        {!facebookSubmitting && (
                          <Icon.Button
                            height={50}
                            size={30}
                            name="logo-facebook"
                            backgroundColor="#3b5998"
                            onPress={onFacebookButtonPress}>
                            Facebook
                          </Icon.Button>
                        )}
                        {facebookSubmitting && (
                          <Icon.Button
                            disabled={true}
                            height={50}
                            size={30}
                            name="logo-facebook"
                            backgroundColor="#3b5998">
                            <ActivityIndicator
                              size="large"
                              color={Colors.primary}
                            />
                          </Icon.Button>
                        )}
                      </StyledButton> */}
                                            {Platform.OS === 'ios' ? (
                                                <StyledButton>
                                                    {!appleSubmitting && (
                                                        <Icon.Button
                                                            width={180}
                                                            height={50}
                                                            size={30}
                                                            name="logo-apple"
                                                            backgroundColor="#000"
                                                            // onPress={() =>
                                                            //     onAppleButtonPress().then(() =>
                                                            //         console.log('Signed in with Apple!'),
                                                            //     )
                                                            // }
                                                            >
                                                            Sign in with Apple
                                                        </Icon.Button>
                                                    )}
                                                    {appleSubmitting && (
                                                        <Icon.Button
                                                            disabled={true}
                                                            width={150}
                                                            height={50}
                                                            size={30}
                                                            name="logo-google"
                                                            backgroundColor="#dd4b39">
                                                            <ActivityIndicator
                                                                size="large"
                                                                color={Colors.primary}
                                                            />
                                                        </Icon.Button>
                                                    )}
                                                </StyledButton>
                                            ) : (
                                                <StyledButton>
                                                    {!googleSubmitting && (
                                                        <Icon.Button
                                                            width={120}
                                                            height={50}
                                                            size={30}
                                                            name="logo-google"
                                                            backgroundColor="#dd4b39"
                                                            onPress={() =>
                                                                onGoogleButtonPress().then(() =>
                                                                    console.log('Signed in with Google!'),
                                                                )
                                                            }>
                                                            Google
                                                        </Icon.Button>
                                                    )}
                                                    {googleSubmitting && (
                                                        <Icon.Button
                                                            disabled={true}
                                                            width={120}
                                                            height={50}
                                                            size={30}
                                                            name="logo-google"
                                                            backgroundColor="#dd4b39">
                                                            <ActivityIndicator
                                                                size="large"
                                                                color={Colors.primary}
                                                            />
                                                        </Icon.Button>
                                                    )}
                                                </StyledButton>
                                            )}
                                        </SocialButtonView>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </LoginView>
            </StyledContainer>
        </KeyboardWrapper>
    );
};

export default Login;
