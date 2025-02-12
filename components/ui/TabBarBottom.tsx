import React from 'react';
import { TabBarView, TabBarImage, TabBarText }  from '@/constants/Styles';;

const TabBarBottom = ({ focused, image, title, ...props }:any) => {
    return (
        <TabBarView>
            <TabBarImage focused={focused} source={image} resizeMode="cover" />
            <TabBarText focused={focused}>{title}</TabBarText>
        </TabBarView>
    );
};

export default TabBarBottom;
