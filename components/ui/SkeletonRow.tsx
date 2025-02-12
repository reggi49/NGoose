import React from 'react';
import SkeletonLoading from "expo-skeleton-loading";
import { View } from 'react-native';

const SkeletonRow = () => {
    const items = [1, 2, 3, 4, 5, 6]; 
    return (
        <SkeletonLoading background={"lightgrey"} highlight={"white"}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginTop: 12 }}>
            {items.map((item, index) => (
                <View key={index} style={{ flexDirection: 'column', alignItems: 'center', marginRight: 12 }}>
                    <View style={{ width: 100, height: 150, borderRadius: 20, backgroundColor: '#ccc' }} />
                    <View style={{ marginTop: 12 }} />
                    <View style={{ width: 100, height: 20, borderRadius: 4, backgroundColor: '#ccc' }} />
                </View>
            ))}
            </View>
        </SkeletonLoading>
    );
};

export default SkeletonRow;
