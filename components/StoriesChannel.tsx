import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StyledContainer } from '@/constants/Styles';
import SkeletonRound from '@/components/ui/SkeletonRound';
import RgStory from 'react-native-rg-story';
import InstagramStories, { InstagramStoriesPublicMethods } from '@birdwingo/react-native-instagram-stories';

const StoriesChannel = () => {
    // console.log('datax',stories);
    const ref = useRef(null); // if using typescript - useRef<InstagramStoriesPublicMethods>( null )
    
    // const keyMap = {
    //     name: stories.channel_title,
    //     imgUrl: stories.thumbnail,
    //     stories: stories.posts.map((post, index) => ({
    //         id: `story${index + 1}`,
    //         source: { uri: post.uri },
    //         // mediaType: 'video',
    //     }))
    // };

    // const transformedData = Object.keys(stories).reduce((acc, key) => ({
    //     ...acc,
    //     [keyMap[key] || key]: stories[key],
    // }), {});
   const stories = [{
        id: 'user1',
        name: 'User 1',
        imgUrl: 'user1-profile-image-url',
        stories: [
            { id: 'story1', source: { uri: 'https://bogorstore.com/agoose/images/thumbnail/202401161603.Putri-Ikan-Emas---Asal-Usul-Danau-Tobapp.png' } },
            { id: 'story2', source: { uri: 'https://bogorstore.com/agoose/images/thumbnail/202401161603.Putri-Ikan-Emas---Asal-Usul-Danau-Tobapp.png' } },
        ]
    }, // ...
    ];
    const setStories = () => ref.current?.setStories(stories);

    return (
        <StyledContainer>
            {/* <Text style={{...Fonts.h2, color: Colors.darkBlue, fontWeight: 'bold'}}>
          Penerbit
        </Text> */}
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // backgroundColor: '#000',
                    // paddingBottom: 10,
                    // paddingTop: 10,
                }}>
                {stories === null ? (
                    <SkeletonRound />
                ) : (
                        <View>
                            <InstagramStories
                                ref={ref}
                                stories={stories}
                            />
                            {/* <Pressable onPress={setStories}>{...}</Pressable> */}
                        </View>
                )}
            </ScrollView>
        </StyledContainer>
    );
};

export default StoriesChannel;
