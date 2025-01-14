import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    CarouselView,
    CarouselImage,
    CarouselText,
    CarouselWrapper,
} from '@/constants/Styles';

import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import { useColorScheme } from '@/hooks/useColorScheme';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import SkeletonCarousel from '@/components/ui/SkeletonCarousel';
import { useNavigation } from '@react-navigation/native';

const CarouselHeader = featured => {
    const [activeIndex, setActivateIndex] = useState(0);
    const carouselRef = React.createRef();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                // onPress={() =>
                //     navigation.navigate('StoriesDetail', {
                //         stories: item,
                //     })
                // }
                style={{
                    backgroundColor: Colors[colorScheme ?? 'light'].softBlue,
                    borderRadius: 20,
                    height: 200,
                }}>
                <CarouselView>
                    <CarouselImage
                        source={
                            item.background !== null
                                ? { uri: item.background }
                                : { uri: item.thumbnail }
                        }>
                        {/* <CarouselText>{item.title}</CarouselText> */}
                        {/* <CarouselText subtext={true}>{item.channelTitle}</CarouselText> */}
                    </CarouselImage>
                </CarouselView>
            </TouchableOpacity>
        );
    };

    const renderPagination = featured => (
        <Pagination
            dotsLength={featured.length}
            activeDotIndex={activeIndex}
            dotStyle={{ width: 20, backgroundColor: Colors[colorScheme ?? 'light'].black }}
            containerStyle={{ right: 10, paddingVertical: 10 }}
            inactiveDotStyle={{
                width: 15,
                height: 15,
                borderRadius: 15,
                backgroundColor: Colors[colorScheme ?? 'light'].lightGray3,
            }}
        />
    );

    return (
        <CarouselWrapper>
            {featured === null ? (
                <SkeletonCarousel />
            ) : (
                <View>
                    <Carousel
                        ref={carouselRef}
                        data={featured}
                        sliderWidth={Sizes.width}
                        itemWidth={Sizes.width}
                        itemHight={100}
                        // firstItem={1}
                        loop={true}
                        renderItem={_renderItem}
                        onSnapToItem={index => setActivateIndex(index)}
                    />
                    {/* {renderPagination(featured)} */}
                </View>
            )}
        </CarouselWrapper>
    );
};

export default CarouselHeader;
