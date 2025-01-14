import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonRound = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginLeft={24}
                marginTop={12}>
                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                <SkeletonPlaceholder.Item alignItems="center" marginRight={12}>
                    <SkeletonPlaceholder.Item
                        width={65}
                        height={65}
                        borderRadius={65 / 2}
                    />
                    <SkeletonPlaceholder.Item marginTop={12}>
                        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
};

export default SkeletonRound;
