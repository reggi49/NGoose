import styled from 'styled-components';
import {Sizes} from './Sizes';
import {Colors} from './Colors';
import {Fonts} from './Fonts';

export const StyledContainer = styled.View`
  flex: 1;
  padding-top: 0px;
`;

export const LoginBackground = styled.ImageBackground`
  height: ${Sizes.height / 2.8}px;
  width: ${Sizes.width}px;
  justify-content: center;
  align-items: center;
`;

export const LoginView = styled.View`
  flex: 1.5;
  margin-bottom: 50px;
  bottom: 50px;
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
  border-top-start-radius: 45px;
  border-top-end-radius: 45px;
  ${props =>
    props.signup === true &&
    `
     bottom: 120px;
  `}
`;
export const SignupView = styled.View`
  flex: 1;
  bottom: 35px;
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
  border-top-start-radius: 45px;
  border-top-end-radius: 45px;
  padding: 20px;
`;

export const ThankView = styled.View`
  flex: 1.5;
  background-color: ${Colors.white};
  justify-content: center;
  align-items: center;
  top: -20px;
  border-top-start-radius: 45px;
  border-top-end-radius: 45px;
`;
export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
  width: 70%;
  height: 50%;
`;

export const PageTitle = styled.Text`
  color: ${Colors.primary}
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 1px;
  ${props =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${Colors.white};
  margin-top: 10px;
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  border-width: 1px;
  border-color:${Colors.lightGray}
  font-size: 16px;
  height: 50px;
  color: ${Colors.black};
`;

export const StyledInputLabel = styled.Text`
  margin-top: 10px;
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 45px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 45px;
  position: absolute;
  z-index: 1;
`;

export const LogoutView = styled.View`
  flex-direction: row;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 50px;
  ${props =>
    props.login === true &&
    `background-color: ${Colors.primary}
  `};
  ${props =>
    props.logout === true &&
    `background-color: ${Colors.softRed}
     flex: 1;
     margin-right: 8px;
  `};
  ${props =>
    props.delete === true &&
    `background-color: ${Colors.lightGray4}
     flex: 1;
  `};
`;

export const EditButton = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 30px;
  background-color: ${Colors.primary};
  ${props =>
    props.showProfile === true &&
    `background-color: ${Colors.lightGreen}
  `};
`;

export const EditText = styled.Text`
  color: ${Colors.secondary};
  font-size: 15px;
`;

export const SocialButtonView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  ${props =>
    props.google === true &&
    `
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
  color: ${Colors.secondary};
  font-size: 16px;
  ${props =>
    props.google === true &&
    `
    color: ${Colors.secondary};
    padding: 25px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${props => (props.type == 'SUCCESS' ? 'green' : 'red')};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  color: ${Colors.lightGray}
  justify-content: center;
  align-content: center;
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const TextLinkContent = styled.Text`
  color: ${Colors.primary};
  font-size: 18px;
  text-align: center;
`;

export const AddButton = styled.TouchableOpacity`
  top: -30px;
  justify-content: center;
  align-items: center;
  shadow: {
    shadowColor: #7F5DF0;
    shadowOffset: {
      width: 0;
      height: 10;
    },
    shadowOpacity: 0.25;
    shadowRadius: 3.5;
    elevation: 5;
  },
`;
export const ButtonView = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #e32f45;
  border-width: 5px;
  border-color: rgba(220, 220, 220, 0.3);
`;
export const TabBarView = styled.View`
  align-items: center;
  justify-content: center;
`;
export const TabBarImage = styled.Image`
  width: 35px;
  height: 35px;
  tint-color: ${Colors.lightGray3};
  ${props =>
    props.focused === true &&
    `
    tintColor: ${Colors.primary};
  `}
`;
export const TabBarText = styled.Text`
  font-size: 12px;
  color: #748c94;
  ${props =>
    props.focused === true &&
    `
    color: ${Colors.primary};
  `}
`;
export const DividerView = styled.View`
  flex: 1;
  border-left-color: ${Colors.lightGray};
  border-left-width: 1px;
`;

export const HeaderView = styled.View`
  background-color: ${Colors.softBlue};
  flex: 1;
  flex-direction: row;
  padding-horizontal: ${Sizes.padding}px;
  align-items: center;
`;

export const HeaderSearch = styled.TouchableOpacity`
  height: 40px;
  padding-left: 3px;
  border-radius: 20px;
`;

export const SerchTextInput = styled.TextInput`
  border-width: 1px;
  border-color: ${Colors.lightBlue};
  border-radius: 25px;
  height: 40px;
  font-size: 13px;
  padding-left: 15px;
  padding-right: 40px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 5px;
`;

export const StoriesListView = styled.View`
  margin-vertical: 8px;
`;

export const StoriesRowView = styled.View`
  flex-direction: row;
`;

export const ButtonRowView = styled.TouchableOpacity`
  flex-direction: row;
`;

export const StoriesInfo = styled.View`
  margin-left: 12px;
  width: ${Sizes.width - 150}px;
`;

export const StoriesNameText = styled.Text`
  padding-right: ${Sizes.padding}px;
  ${Fonts.h3};
  color: ${Colors.darkBlue};
`;
export const StoriesAuthorText = styled.Text`
  ${Fonts.body3};
  color: ${Colors.lightBlue};
`;

export const StoriesSeo = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

export const SeoView = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${Colors.lightBlue};
  ${props =>
    props.bookmark === true &&
    `
    width: 25px;
    height: 25px;
    tint-color: ${Colors.softRed};
  `}
`;

export const SeoPageText = styled.Text`
  ${Fonts.body4};
  color: ${Colors.lightBlue};
  padding-horizontal: 8px;
`;

export const GenreView = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const GenreBoxView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-right: 8px;
  height: 33px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.primary};
`;

export const SeoGenreText = styled.Text`
  ${Fonts.body4};
  color: ${props => props.inputColor || Colors.primary};
`;

export const BookmarkButton = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 5px;
`;

export const BackgroundImageDetail = styled.ImageBackground`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const BackgroundViewDetail = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: ${props => props.backgroundColor};
`;

export const NavHeaderDetail = styled.View`
  flex-direction: row;
  padding-horizontal: ${Sizes.radius}px;
  height: 40px;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const NavHeaderButton = styled.TouchableOpacity`
  margin-left: ${Sizes.base}px;
`;

export const NavHeaderIcon = styled.Image`
  width: 25px;
  height: 25px;
  tint-color: #000;
  ${props =>
    props.align === true &&
    `
    alignSelf: flex-end;
  `}
`;

export const NavHeaderTitle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DetailViewCover = styled.View`
  flex: 5;
  align-items: center;
`;

export const ImageDetailCover = styled.Image`
  flex: 1;
  width: 150px;
  height: 200px;
`;

export const DetailAuthorView = styled.View`
  flex: 1.8;
  align-items: center;
  justify-content: center;
`;

export const DetailStoriesView = styled.View`
  flex-direction: row;
  padding-vertical: 5px;
  margin: ${Sizes.padding}px;
  border-radius: ${Sizes.radius}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const StoriesInfoView = styled.View`
  flex: 5;
  align-items: center;
  ${props =>
    props.paddingHorizontal === true &&
    `
    padding-horizontal: ${Sizes.radius}px;
  `}
`;

export const CarouselView = styled.View`
  top: 0px;
  margin-right: 0px;
  bottom: 0px;
  justify-content: center;
  align-items: center;
`;

export const CarouselWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const CarouselImage = styled.ImageBackground`
  resize-mode: contain;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
`;

export const CarouselText = styled.Text`
  color: ${Colors.white}
  position: absolute;
  font-size: 18px;
  left: 10px;
  bottom: 40px;
  ${props =>
    props.subtext === true &&
    `
    font-size: 15px;
    left: 20px;
    bottom: 10px;
  `}
`;

export const SplashView = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${Colors.primary};
`;

export const ContentContainer = styled.View`
  top: 35%;
  align-items: center;
`;

export const StoriesCover = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 10px;
`;

export const StoriesCoverList = styled.Image`
  width: 150px;
  height: 200px;
  border-radius: 20px;
  left: 5px;
  right: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-radius: 15px;
  overflow: hidden;
  width: ${Sizes.width / 3.2}px;
  height: 200px;
  background-color: ${Colors.primary};
`;

export const ChannelsList = styled.Image`
  border-radius: 10px;
  margin: 10px 20px 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  width: ${Sizes.width / 2.3}px;
  height: auto;
  aspect-ratio: 1;
  background-color: ${Colors.primary};
`;

export const StoriesDetailView = styled.View`
  margin-top: ${Sizes.radius}px;
  flex-direction: row;
  align-items: center;
`;

export const StoriesDetailWrapper = styled.View`
  padding-horizontal: ${Sizes.padding}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const StoriesDetailMore = styled.Text`
  ${Fonts.h3};
  color: ${Colors.lightBlue};
  align-self: flex-start;
  margin-top: 2px;
  margin-right: 5px;
`;

export const StoriesDetailImage = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${Colors.lightBlue};
  ${props =>
    props.page === true &&
    `
    margin-left: ${Sizes.base}px;
  `}
`;

export const StoriesDetailText = styled.Text`
  margin-left: 5px;
  ${Fonts.body3};
  color: ${Colors.lightBlue};
`;

export const ChannelDetailText = styled.Text`
  margin-left: 15px;
  margin-bottom: 15px;
  ${Fonts.h3};
  color: ${Colors.lightBlue};
`;

export const ViewFooterList = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonFooterList = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${Colors.primary};
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextProfile = styled.Text`
  color: ${Colors.primary};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
