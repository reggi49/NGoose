import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
    CarouselView,
    CarouselImage,
    CarouselText,
    CarouselWrapper,
    PaginationWrapper
} from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Sizes } from '@/constants/Sizes';
import { useColorScheme } from '@/hooks/useColorScheme';
import SkeletonCarousel from '@/components/ui/SkeletonCarousel';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedScrollHandler,
    useScrollViewOffset,
    useSharedValue,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
    item: {
        map: any;
        id: string;
        title: string;
        img: any;
        background: string;
        thumbnail: string;
    };
    index: number;
    scrollX: Animated.SharedValue<number>;
};

const CarouselHeader = (featured: any) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    const CarouselItem = ({ item, index, scrollX }: Props) => {
        const carouselStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: interpolate(
                            scrollX.value,
                            [(index - 1) * Sizes.width, index * Sizes.width, (index + 1) * Sizes.width],
                            [-Sizes.width * 0.15, 0, Sizes.width * 0.15],
                            'clamp'
                        ),
                    },
                    {
                        scale: interpolate(
                            scrollX.value,
                            [(index - 1) * Sizes.width, index * Sizes.width, (index + 1) * Sizes.width],
                            [0.9, 1, 0.9],
                            'clamp'
                        ),
                    },
                ],
            };
        });
        return (
            <Animated.View
                style={[
                    { width: Sizes.width, height: 250},
                    carouselStyle,
                ]}
                key={item.id}
            >
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
                        // height: 200,
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
            </Animated.View>
        );
    };

    const Pagination = ({ item, scrollX }: Props) => {
        return (
            <PaginationWrapper>
                {item.map((_: any, index: any) => {
                    const inputRange = [
                        (index - 1) * Sizes.width,
                        index * Sizes.width,
                        (index + 1) * Sizes.width,
                    ];

                    const dotWidth = useAnimatedStyle(() => {
                        const scale = interpolate(
                            scrollX.value,
                            inputRange,
                            [8, 16, 8],
                            'clamp'
                        );
                        return {
                            width: scale,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#333',
                            marginHorizontal: 4,
                        };
                    });

                    return <Animated.View key={index} style={[{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#333',
                        marginHorizontal: 4,
                    }, dotWidth]} />;
                })}
            </PaginationWrapper>
        );
    };

    return (
        <CarouselWrapper>
            {featured === null ? (
                <SkeletonCarousel />
            ) : (
                    <>
                    <Animated.FlatList
                        horizontal
                        onScroll={onScrollHandler}
                        data={featured}
                        keyExtractor={(item) => item.id}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return <CarouselItem item={item} index={index} scrollX={scrollX} />;
                        }}
                    />
                        <Pagination item={featured} scrollX={scrollX} index={0} />
                </>
            )}
        </CarouselWrapper>
    );
};

export default CarouselHeader;
