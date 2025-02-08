import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import { StyledContainer } from '@/constants/Styles';
import SkeletonRound from '@/components/ui/SkeletonRound';
import RgStory from 'react-native-rg-story';
import InstaStory from 'react-native-insta-story';

const StoriesChannel = stories => {
    const data = stories?.map(item => ({
        user_id: item.id,
        user_image: item.thumbnail,
        user_name: item.channel_title,
        stories: item.posts?.map(story => ({
            story_id: story.id,
            story_image: story.thumbnail,
            swipeText: story.title
        })) || []  // Default to empty array if item.posts is null/undefined
    })) || [];

    return (
        <StyledContainer>
            {/* <Text style={{...Fonts.h2, color: Colors.darkBlue, fontWeight: 'bold'}}>
          Penerbit
        </Text> */}
            {stories === null ? (
                <SkeletonRound />
            ) : (
                    <InstaStory
                        data={data}
                        duration={10}
                        // renderCloseComponent={({ item, onPress }) => (
                        //     <View style={{ flexDirection: 'row' }}>
                        //         {/* <Button onPress={shareStory}>Share</Button> */}
                        //         <Button title="Click Me" onPress={onPress}></Button>
                        //     </View>
                        // )}
                        //onStart={item => console.log('start :', item)}
                        //onClose={item => console.log('close: ', item)}
                        // customSwipeUpComponent={
                        //   <View>
                        //     <Text>Swipe up</Text>
                        //   </View>
                        // }
                        style={{ marginTop: 10, marginLeft: 15 }}
                    />     
            )}   
        </StyledContainer>
    );
};

export default StoriesChannel;
