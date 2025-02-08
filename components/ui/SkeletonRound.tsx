import React from 'react';
import SkeletonLoading from "expo-skeleton-loading";
import { View } from 'react-native';

const SkeletonRound = () => {
    const items = [1, 2, 3, 4, 5, 6]; 
    return (
        <SkeletonLoading background={"lightgrey"} highlight={"white"}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginTop: 12 }}>
                {items.map((item, index) => (
                    <View key={index} style={{ alignItems: 'center', marginRight: 12 }}>
                    <View style={{ width: 65, height: 65, backgroundColor: "#adadad", borderRadius: 65 / 2 }} />
                    <View style={{ marginTop: 12 }} >
                        <View style={{ width: 60, height: 20, backgroundColor: "#adadad", borderRadius: 4 / 2 }} />
                    </View>
                </View>
                ))}
            </View>
        </SkeletonLoading>
    );
};

export default SkeletonRound;
