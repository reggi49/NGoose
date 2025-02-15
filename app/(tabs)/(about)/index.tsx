import React, { useState, useContext, useEffect } from 'react';
import {
    StyledContainer,
    StyledButton,
    ChannelsList,
    LoginBackground,
    ThankView,
    ChannelDetailText,
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    SafeAreaView,
    Text,
    TouchableOpacity,
    FlatList,
    Linking,
} from 'react-native';
// const { darkLight, primary } = Colors;
import KeyboardWrapper from '@/components/ui/KeyboardWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CredentialsContext } from './../components/CredentialsContext';
import { useNavigation } from '@react-navigation/native';

type Props = {
    item: {
        map: any;
        channel_id: string;
        channel_title: string;
        thumbnail: string;
    };
    index: number;
};
const Thanks = () => {
    const navigation = useNavigation();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    // const { storedCredentials, setStoredCredentials } =
    //     useContext(CredentialsContext);

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = () => {
        if (!loading) {
            setLoading(true);
            axios
                .get('https://bogorstore.com/agoose/api/posts/listchannels')
                .then(res => {
                    if (res.data.length > 0) {
                        // console.log(res.data);
                        setChannels(res.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.log('error:', error);
                });
        }
    };
    const renderItem = ({ item, index } : Props) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                }}
                onPress={() =>
                    Linking.openURL('https://www.youtube.com/channel/' + item.channel_id)
                }>
                {/* Channels Cover */}
                <ChannelsList
                    style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                    source={{
                        uri: item.thumbnail,
                    }}
                    resizeMode="cover"
                />
                <ChannelDetailText>{item.channel_title}</ChannelDetailText>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardWrapper>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StyledContainer>
                    <LoginBackground
                        resizeMode="cover"
                        source={require('@/assets/img/special-thanks-children.jpg')}
                    />
                    <ThankView>
                        <View
                            style={{
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}>
                            <Text
                                style={{
                                    ...Fonts.h1,
                                    color: Colors.light.darkBlue,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingBottom: 10,
                                }}>
                                Special Thank You
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.h3,
                                    color: Colors.light.darkBlue,
                                    textAlign: 'justify',
                                }}>
                                Application is dedicated to my daughter 2nd birthday.
                                Application is free and will always be free. If you have any
                                questions please contact me at email reggimuhamad@yahoo.com.
                            </Text>
                        </View>
                    </ThankView>
                    <View style={{marginLeft: 10,marginRight: 13,marginBottom: 100}}>
                        {loading ? (
                            <ActivityIndicator color={Colors.light.primary} style={{ margin: 15 }} />
                        ) : null}
                        <FlatList
                            numColumns={2}
                            data={channels}
                            renderItem={renderItem}
                            keyExtractor={item => `key-${item.channel_title}`}
                            onEndReached={fetchChannels}
                            onEndReachedThreshold={0.5}
                        />
                    </View>
                </StyledContainer>
            </SafeAreaView>
        </KeyboardWrapper>
    );
};

export default Thanks;
