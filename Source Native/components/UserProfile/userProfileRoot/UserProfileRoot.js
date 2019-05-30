import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import LogIn from '../../../containers/UserProfile/login/Login'
import SignUp from '../../../containers/UserProfile/signup/SignUp'
import ResetPassword from '../../../containers/UserProfile/resetPassword/ResetPassword'


const RootUserInfo = createStackNavigator(
  {
    LogIn: LogIn,
    SignUp: SignUp,
    ResetPassword: ResetPassword
  },
  {
    initialRouteName: "LogIn"
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(RootUserInfo);

const UserProfileRoot=()=> <AppContainer />;

export default UserProfileRoot;
