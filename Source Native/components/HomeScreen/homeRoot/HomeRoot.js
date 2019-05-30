import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import Home from '../../../containers/HomeScreen/home/Home'
import VendorProfile from '../../common/vendorprofile/VendorProfile'

const RootStack = createStackNavigator(
  {
    Home: Home,
    VendorProfile: VendorProfile
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

const HomeRoot =()=> <AppContainer />

export default HomeRoot;
