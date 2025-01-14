import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import {
    HeaderView,
    HeaderSearch,
    SerchTextInput,
    SearchButton,
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import { useNavigation } from '@react-navigation/native';

const Header = name => {
    const navigation = useNavigation();
    return (
        <HeaderView>
            {/* Greetings */}
            <View style={{ flex: 1 }}>
                <View style={{ marginRight: Sizes.padding }}>
                    <TouchableOpacity
                        // onPress={() =>
                        //     navigation.navigate('Profile', {
                        //         data: 'profile',
                        //     })
                        // }
                        >
                        <Text style={{ ...Fonts.h3}}>
                            Hallo {name}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search */}
            <HeaderSearch
                onPress={() => {
                    console.log('Point');
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <SerchTextInput
                        placeholder="Cari Dongeng"
                        // placeholderTextColor={Colors.lightBlue}
                        autoCapitalize="none"
                        returnKeyType="search"
                        // onFocus={() => {
                        //     navigation.navigate('SearchStories');
                        // }}
                    // onSubmitEditing={this.handleSubmit}
                    // onSubmitEditing={() => {
                    //   navigation.navigate('SearchStories');
                    // }}
                    // Linking.openURL(this.state.url + this.state.search)
                    />
                    <SearchButton
                        onPress={() => {
                            // navigation.navigate('SearchStories');
                        }}
                    // Linking.openURL(this.state.url + this.state.search)
                    >
                        {/* <Image
                            source={require('../assets/icons/search_icon.png')}
                            style={{ width: 20, height: 20, tintColor: Colors.lightBlue }}
                        /> */}
                    </SearchButton>
                </View>
            </HeaderSearch>
        </HeaderView>
    );
};

export default Header;
