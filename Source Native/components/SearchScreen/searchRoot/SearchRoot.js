import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import Filter from '../../../containers/SearchScreen/searchRoot/filter/Filter'
import VendorProfile from '../../common/vendorprofile/VendorProfile'


const RootSearch = createStackNavigator(
  {
    Filter: Filter,
    VendorProfile: VendorProfile
  },
  {
    initialRouteName: "Filter"
  }
);

const AppContainer = createAppContainer(RootSearch);

const SearchRoot=()=> <AppContainer />

export default SearchRoot;
