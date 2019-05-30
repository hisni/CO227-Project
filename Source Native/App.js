import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/Entypo';
import SearchRoot from './components/SearchScreen/searchRoot/SearchRoot'
import UserProfileRoot from './components/UserProfile/userProfileRoot/UserProfileRoot'
import HomeRoot from './components/HomeScreen/homeRoot/HomeRoot'
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD_U3qQekQqULtlVCv7A2GsysPnH2X96TI",
    authDomain: "co227-project.firebaseapp.com",
    databaseURL: "https://co227-project.firebaseio.com",
    storageBucket: "co227-project.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const TabNavigator = createBottomTabNavigator(
  {
    UserProfileRoot: {screen: UserProfileRoot,
    navigationOptions:{
      tabBarLabel:'User',
      tabBarIcon: ({tintcolor})=>(
        <UserIcon name='user' color={tintcolor} size={24}/>
      )
    }},
    HomeRoot: {screen: HomeRoot,
    navigationOptions:{
      tabBarLabel:'Home',
      tabBarIcon: ({tintcolor})=>(
        <Icon name='ios-home' color={tintcolor} size={24}/>
      )
    }},
    SearchRoot : {screen: SearchRoot,
    navigationOptions:{
      tabBarLabel:'Search',
      tabBarIcon: ({tintcolor})=>(
        <Icon name='ios-search' color={tintcolor} size={24}/>
      )
    }}
  },
  {
    initialRouteName: "HomeRoot",
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'grey'
    }

  }
);

export default createAppContainer(TabNavigator);
