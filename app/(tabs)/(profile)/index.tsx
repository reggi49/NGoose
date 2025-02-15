import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import {
    StyledContainer,
    PageTitle,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    LoginBackground,
    LoginView,
    TextProfile,
    EditButton,
    EditText,
    StoriesListView,
    ButtonRowView,
    StoriesRowView,
    StoriesInfo,
    StoriesSeo,
    StoriesNameText,
    StoriesAuthorText,
    SeoView,
    SeoPageText,
    GenreView,
    GenreBoxView,
    SeoGenreText,
    BookmarkButton,
    ViewFooterList,
    ButtonFooterList,
    LogoutView,
} from '@/constants/Styles';
import {
    View,
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    Image,
    Text,
    Alert,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '@/constants/Colors';
// const { darkLight, primary } = Colors;
import KeyboardWrapper from '@/components/ui/KeyboardWrapper';
import TextBox from '@/components/TextBox';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonList from '@/components/ui/SkeletonList';
import axios from 'axios';
import { CredentialsContext } from '@/components/helper/CredentialsContext';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ route }: any) => {
    const [myLoved, setMyLoved] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState();

    const navigation = useNavigation();

    const { storedCredentials, setStoredCredentials } =
        useContext(CredentialsContext);
    const { id, email, name, password, displayName, photoUrl } = storedCredentials;

    const updateUser = (credentials, setSubmitting) => {
        handleMessage(null);
        if (credentials.password !== '' && credentials.email !== email) {
            console.log('ganti email dan password');
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    userCredential.user.updateEmail(credentials.email);
                    userCredential.user.updatePassword(credentials.password);
                    firestore()
                        .collection('users')
                        .doc(id)
                        .update({
                            name: credentials.name === '' ? name : credentials.name,
                            email: credentials.email,
                            password: credentials.password,
                        })
                        .then(() => {
                            handleMessage('Email dan Password berhasil diubah.', 'SUCCESS');
                            setSubmitting(false);
                            const data = {
                                id: id,
                                name: credentials.name === '' ? name : credentials.name,
                                email: credentials.email === '' ? email : credentials.email,
                                password:
                                    credentials.password === '' ? password : credentials.password,
                            };
                            persistLogin({ ...data }, message, 'SUCCESS');
                        })
                        .catch(error => {
                            setSubmitting(false);
                            handleMessage(error.message);
                            console.log({ errorMessage: error.message });
                        });
                })
                .catch(error => {
                    setSubmitting(false);
                    console.log('error ganti email dan password');
                    handleMessage(error.message);
                });
        } else if (credentials.password !== '' && credentials.email === email) {
            console.log('ganti password');
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    userCredential.user.updatePassword(credentials.password);
                    firestore()
                        .collection('users')
                        .doc(id)
                        .update({
                            name: credentials.name === '' ? name : credentials.name,
                            password: credentials.password,
                        })
                        .then(() => {
                            handleMessage('Password berhasil diubah.', 'SUCCESS');
                            setSubmitting(false);
                            const data = {
                                id: id,
                                name: credentials.name === '' ? name : credentials.name,
                                email: credentials.email === '' ? email : credentials.email,
                                password:
                                    credentials.password === '' ? password : credentials.password,
                            };
                            persistLogin({ ...data }, message, 'SUCCESS');
                        })
                        .catch(error => {
                            setSubmitting(false);
                            handleMessage(error.message);
                            console.log({ errorMessage: error.message });
                        });
                })
                .catch(error => {
                    setSubmitting(false);
                    handleMessage(error.message);
                    console.log('error ganti password');
                });
        } else if (credentials.password === '' && credentials.email !== email) {
            console.log('ganti email');
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    userCredential.user
                        .updateEmail(credentials.email)
                        .then(() => {
                            firestore()
                                .collection('users')
                                .doc(id)
                                .update({
                                    name: credentials.name === '' ? name : credentials.name,
                                    email: credentials.email,
                                })
                                .then(() => {
                                    handleMessage('Email berhasil diubah.', 'SUCCESS');
                                    setSubmitting(false);
                                    const data = {
                                        id: id,
                                        name: credentials.name === '' ? name : credentials.name,
                                        email: credentials.email === '' ? email : credentials.email,
                                        password:
                                            credentials.password === ''
                                                ? password
                                                : credentials.password,
                                    };
                                    persistLogin({ ...data }, message, 'SUCCESS');
                                })
                                .catch(error => {
                                    setSubmitting(false);
                                    handleMessage(error.message);
                                    console.log({ errorMessage: error.message });
                                });
                        })
                        .catch(error => {
                            setSubmitting(false);
                            console.log('error ganti email');
                            handleMessage(error.message);
                        });
                })
                .catch(error => {
                    setSubmitting(false);
                    console.log('error ganti email');
                    handleMessage(error.message);
                });
        } else if (credentials.name !== name) {
            console.log('ganti nama');
            firestore()
                .collection('users')
                .doc(id)
                .update({
                    name: credentials.name === '' ? name : credentials.name,
                })
                .then(() => {
                    handleMessage('Nama berhasil diubah.', 'SUCCESS');
                    setSubmitting(false);
                    const data = {
                        id: id,
                        name: credentials.name === '' ? name : credentials.name,
                        email: email,
                        password: password,
                    };
                    persistLogin({ ...data }, message, 'SUCCESS');
                })
                .catch(error => {
                    setSubmitting(false);
                    handleMessage(error.message);
                    console.log({ errorMessage: error.message });
                });
        } else {
            setSubmitting(false);
        }
    };

    const fetchLoved = () => {
        if (offset < 2 && myLoved.length === 12) {
            setOffset(2);
        }
        console.log('cek', offset);
        setLoading(true);
        axios
            .get(
                'https://bogorstore.com/agoose/api/posts/getloved?users=' +
                id +
                '&page=' +
                offset,
            )
            .then(res => {
                if (myLoved.length < 12) {
                    console.log('data kurang dari 12');
                    setOffset(1);
                    setMyLoved(res.data.data);
                } else if (offset < 2 && myLoved.length === 12) {
                    console.log('data lebih dari 12');
                    setOffset(2);
                } else {
                    console.log('kondisi loadmore');
                    setOffset(offset + 1);
                    setMyLoved([...myLoved, ...res.data.data]);
                }
                saveData(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                AsyncStorage.getItem('saveLovedlist', (error, data) => {
                    if (data) {
                        setMyLoved(JSON.parse(data));
                        setLoading(false);
                    }
                });
                console.log(err);
            });
    };

    const delLoved = data => {
        // console.log('cek data', data);
        axios
            .delete(
                'https://bogorstore.com/agoose/api/posts/delloved?users=' +
                id +
                '&posts=' +
                data,
            )
            .then(res => {
                console.log(res);
                handleRemoveItem(data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const delHistory = () => {
        // console.log('cek data', data);
        axios
            .delete(
                'https://bogorstore.com/agoose/api/posts/deluserhistory?users=' + id,
            )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleRemoveItem = data => {
        setMyLoved(myLoved.filter(item => item.videoId !== data));
    };

    const saveData = async data => {
        try {
            await AsyncStorage.setItem('saveLovedlist', JSON.stringify(data));
        } catch (e) {
            console.log(e + 'Failed to save the data to the storage');
        }
    };

    const handleMessage = (message, type = '') => {
        setMessage(message);
        setMessageType(type);
    };

    // Persisting login after signup
    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('AGooseCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch(error => {
                handleMessage('Persisting login failed');
                console.log(error);
            });
    };

    const clearLogin = () => {
        AsyncStorage.removeItem('AGooseCredentials')
            .then(() => {
                setStoredCredentials('');
                auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                navigation.replace('Home');
            })
            .catch(error => console.log(error));
    };

    const deleteLogin = () => {
        Alert.alert(
            'Perhatian',
            'Akun anda akan dihapus, semua data akan hilang dan tidak bisa dikembalikan.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () =>
                        AsyncStorage.removeItem('AGooseCredentials')
                            .then(() => {
                                setStoredCredentials('');
                                auth()
                                    .currentUser.delete()
                                    .then(() => {
                                        console.log('Successfully deleted user');
                                    })
                                    .catch(error => {
                                        console.log('Error deleting user:', error);
                                    });
                                delHistory();
                                navigation.replace('Home');
                            })
                            .catch(error => console.log(error)),
                },
            ],
        );
    };

    const unLoved = data => {
        return Alert.alert(
            'Hapus Dongeng Tersimpan?',
            'Apa Kamu Yakin Ingin Menghapus dongeng?',
            [
                {
                    text: 'Ya',
                    onPress: () => {
                        delLoved(data);
                    },
                },
                // Does nothing but dismiss the dialog when tapped
                {
                    text: 'Tidak',
                },
            ],
        );
    };
    const checkParams = () => {
        if (route !== undefined) {
            route.params.data === 'profile' ? setShowProfile(true) : '';
        } else {
            console.log('no route param');
        }
    };

    useEffect(() => {
        checkParams();
        fetchLoved();
    }, []);

    const loginView = () => {
        return (
            <>
                <View style={{ padding: 20 }}>
                    <PageTitle>Perbaharui Profile</PageTitle>
                    <Formik
                        initialValues={{
                            name: name,
                            email: email,
                            password: '',
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values };
                            if (values.password !== '' && values.password.length < 6) {
                                handleMessage('Password harus lebih dari 5 karakter');
                                setSubmitting(false);
                            } else {
                                // updateUser(values, setSubmitting);
                            }
                        }}>
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            isSubmitting,
                        }) => (
                            <View>
                                <TextBox
                                    label="Full Name"
                                    placeholder="Masukan Nama"
                                    placeholderTextColor={Colors.light.darkBlue}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    icon="person-outline"
                                />
                                <TextBox
                                    label="Email Address"
                                    placeholder="emaimu@gmail.com"
                                    placeholderTextColor={Colors.light.darkBlue}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    icon="mail-outline"
                                />
                                <TextBox
                                    label="Password"
                                    placeholder="Ketikan Password"
                                    placeholderTextColor={Colors.light.darkBlue}
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
                                        <ButtonText>Update Profile</ButtonText>
                                    </StyledButton>
                                )}
                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={Colors.light.primary} />
                                    </StyledButton>
                                )}
                                <Line />
                                <LogoutView>
                                    <StyledButton logout={true} onPress={clearLogin}>
                                        <ButtonText>Logout</ButtonText>
                                    </StyledButton>
                                    <StyledButton delete={true} onPress={deleteLogin}>
                                        <ButtonText>Delete Profile</ButtonText>
                                    </StyledButton>
                                </LogoutView>
                            </View>
                        )}
                    </Formik>
                </View>
            </>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <StoriesListView>
                <StoriesRowView>
                    <ButtonRowView
                        // onPress={() =>
                        //     navigation.navigate('StoriesDetail', {
                        //         stories: item,
                        //     })}
                        >
                        {/* Book Cover */}
                        <Image
                            source={{ uri: item.thumbnail }}
                            resizeMode="cover"
                            style={{ width: 100, height: 150, borderRadius: 10 }}
                        />
                    </ButtonRowView>

                    <StoriesInfo>
                        <ButtonRowView
                            // onPress={() =>
                            //     navigation.navigate('StoriesDetail', {
                            //         stories: item,
                            //     })}
                            >
                            {/* Book name and author */}
                            <View>
                                <StoriesNameText numberOfLines={2}>
                                    {item.title}
                                </StoriesNameText>
                                <StoriesAuthorText>{item.channelTitle}</StoriesAuthorText>
                            </View>
                        </ButtonRowView>

                        {/* Book Info */}
                        <StoriesSeo>
                            <SeoView
                                source={require('@/assets/icons/heart.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>{Math.floor(item.views / 1.5)}</SeoPageText>

                            <SeoView
                                source={require('@/assets/icons/watch.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>{item.views}</SeoPageText>

                            <SeoView
                                source={require('@/assets/icons/chat.png')}
                                resizeMode="contain"
                            />
                            <SeoPageText>0</SeoPageText>
                        </StoriesSeo>

                        <GenreView>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {item.categories.map((name, key) => (
                                    <TouchableWithoutFeedback>
                                        <GenreBoxView key={key}>
                                            <SeoGenreText>{name}</SeoGenreText>
                                        </GenreBoxView>
                                    </TouchableWithoutFeedback>
                                ))}
                            </ScrollView>
                        </GenreView>
                    </StoriesInfo>
                </StoriesRowView>

                <BookmarkButton onPress={() => unLoved(item.videoId)}>
                    <SeoView
                        bookmark={true}
                        source={require('@/assets/icons/delete.png')}
                        resizeMode="contain"
                    />
                </BookmarkButton>
            </StoriesListView>
        );
    };

    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <ViewFooterList>
                <ButtonFooterList activeOpacity={0.9} onPress={fetchLoved}>
                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
                        {myLoved.length < 12 ? 'Refresh Dongeng' : 'Lebih banyak'}
                    </Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </ButtonFooterList>
            </ViewFooterList>
        );
    };

    const lovedView = () => {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                    }}>
                    <PageTitle>Dongeng Tersimpan</PageTitle>
                    {loading && offset === 1 ? (
                        <SkeletonList />
                    ) : (
                        <FlatList
                            data={myLoved}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={renderFooter}
                        />
                    )}
                </View>
            </>
        );
    };

    return (
        <KeyboardWrapper>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StyledContainer>
                    <LoginBackground
                        style={{ top: -50 }}
                        resizeMode="cover"
                        source={require('@/assets/img/sky-background.png')}>
                        <View style={{ top: '-7%' }}>
                            <TextProfile icon="key-outline">{name}</TextProfile>
                            <TextProfile icon="key-outline">{email}</TextProfile>
                            <EditButton
                                showProfile={showProfile ? true : false}
                                onPress={() => setShowProfile(prev => !prev)}>
                                <EditText>
                                    {showProfile ? 'Dongeng Tersimpan' : 'Edit profile'}
                                </EditText>
                            </EditButton>
                        </View>
                    </LoginBackground>
                    <LoginView signup={true}>
                        {showProfile ? loginView() : lovedView()}
                    </LoginView>
                </StyledContainer>
            </SafeAreaView>
        </KeyboardWrapper>
    );
};

export default Profile;
