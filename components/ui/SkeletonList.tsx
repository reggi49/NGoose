import React from 'react';
import SkeletonLoading from "expo-skeleton-loading";
import { View } from 'react-native';
const SkeletonList = () => {
    const items = [1, 2, 3, 4, 5, 6]; 
    return (
        <SkeletonLoading background={"lightgrey"} highlight={"white"}>
            <View style={{ marginLeft: 5, marginVertical: 8 }}>
                {items.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                        <View style={{ width: 100, height: 130, borderRadius: 10, backgroundColor: '#ccc' }} />
                    <View style={{ marginLeft: 12, marginVertical: 8 }}>
                        <View style={{ width: 200, height: 50, borderRadius: 4, backgroundColor: '#ccc' }} />
                        <View style={{ width: 200, height: 20, marginTop: 5, borderRadius: 4, backgroundColor: '#ccc' }} />
                        <View style={{ width: 200, height: 20, marginTop: 5, borderRadius: 4, backgroundColor: '#ccc' }} />
                        <View style={{ width: 200, height: 20, marginTop: 5, borderRadius: 4, backgroundColor: '#ccc' }} />
                    </View>
                </View>
                ))}
            </View>
        </SkeletonLoading>
    );
};

export default SkeletonList;
