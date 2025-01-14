import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Sizes} from './Sizes';

export const Fonts = {
  largeTitle: {
    fontFamily: 'Roboto-regular',
    fontSize: Sizes.largeTitle,
  },
  h1: {fontFamily: 'Roboto-Black', fontSize: Sizes.h1},
  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: Sizes.h2,
  },
  h3: {fontFamily: 'Roboto-Bold', fontSize: Sizes.h3},
  h4: {fontFamily: 'Roboto-Bold', fontSize: Sizes.h4},
  body1: {fontFamily: 'Roboto-Regular', fontSize: Sizes.body1},
  body2: {fontFamily: 'Roboto-Regular', fontSize: Sizes.body2},
  body3: {fontFamily: 'Roboto-Regular', fontSize: Sizes.body3},
  body4: {fontFamily: 'Roboto-Regular', fontSize: Sizes.body4},
};