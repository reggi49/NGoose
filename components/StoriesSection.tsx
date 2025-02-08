import React, { useState } from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import {
    StoriesCover,
    StoriesDetailView,
    StoriesDetailImage,
    StoriesDetailText,
    StoriesDetailWrapper,
    StoriesDetailMore,
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import { useNavigation } from '@react-navigation/native';
import SkeletonRow from '@/components/ui/SkeletonRow';
import Icon from 'react-native-vector-icons/Ionicons';
import { NumberToK } from '@/components/helper/NumberToK';

const StoriesSection = (myStories, section) => {
    const navigation = useNavigation();
    const [loadingData, setloadingData] = useState(true);

    // console.log('data');
    // console.log(myStories);
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginLeft: index == 0 ? Sizes.padding : 0,
                    marginRight: Sizes.radius,
                }}
                onPress={() =>
                    // navigation.navigate('StoriesDetail', {
                    //     stories: item,
                    // })
                    console.log('clicked')
                }>
                {/* Stories Cover */}
                <StoriesCover source={{ uri: item.thumbnail }} resizeMode="cover" />
                {/* Stories Info */}
                <StoriesDetailView>
                    <StoriesDetailImage
                        page={true}
                        source={require('@/assets/icons/heart.png')}
                    />
                    <StoriesDetailText>{NumberToK(Math.floor(item.views / 1.5))}</StoriesDetailText>

                    <StoriesDetailImage
                        page={true}
                        source={require('@/assets/icons/watch.png')}
                    />
                    <StoriesDetailText>{NumberToK(item.views)}</StoriesDetailText>

                    {/* <StoriesDetailImage
            page={true}
            source={require('../assets/icons/chat.png')}
          />
          <StoriesDetailText>0</StoriesDetailText> */}
                </StoriesDetailView>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <StoriesDetailWrapper>
                <Text style={{ ...Fonts.h2, color: Colors.darkBlue, fontWeight: 'bold' }}>
                    {section}
                </Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() =>
                        // navigation.navigate('StoryCategories', {
                        //     categories: myStories,
                        //     title: section,
                        // })
                        console.log('clicked')
                    }>
                    <StoriesDetailMore>Lihat</StoriesDetailMore>
                    <Icon
                        name="chevron-forward-outline"
                        size={30}
                        color={Colors.lightBlue}
                    />
                </TouchableOpacity>
            </StoriesDetailWrapper>
            {myStories === null ? (
                <SkeletonRow />
            ) : (
                <View style={{ flex: 1, marginTop: Sizes.radius }}>
                    <FlatList
                        data={myStories}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
};

export default StoriesSection;
