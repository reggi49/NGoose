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
import Carousel, { Pagination, ICarouselInstance } from 'react-native-reanimated-carousel';
import SkeletonCarousel from '@/components/ui/SkeletonCarousel';
import { useNavigation } from '@react-navigation/native';

const CarouselHeader = (featured: any) => {
    const [activeIndex, setActivateIndex] = useState(0);
    const ref = React.useRef<ICarouselInstance>(null);
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    // navigation.navigate('StoriesDetail', {
                    //     stories: item,
                    // })
                    console.log('clicked')
                }
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

    // const renderPagination = featured => (
    //     <Pagination
    //         dotsLength={featured.length}
    //         activeDotIndex={activeIndex}
    //         dotStyle={{ width: 20, backgroundColor: Colors[colorScheme ?? 'light'].black }}
    //         containerStyle={{ right: 10, paddingVertical: 10 }}
    //         inactiveDotStyle={{
    //             width: 15,
    //             height: 15,
    //             borderRadius: 15,
    //             backgroundColor: Colors[colorScheme ?? 'light'].lightGray3,
    //         }}
    //     />
    // );

    return (
        <CarouselWrapper>
            {featured === null ? (
                <SkeletonCarousel />
            ) : (
                <View >
                    <Carousel
                        // ref={ref}
                        data={featured}
                        autoPlayInterval={200}
                        width={Sizes.width}
                        height={200}
                        pagingEnabled={true}
                        snapEnabled={true}
                        loop={true}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
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
