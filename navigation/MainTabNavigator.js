import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import AllPassengersIcon from '../components/SVGs/BottomNavigation/AllPassengersIcon';
import MyPassengersIcon from '../components/SVGs/BottomNavigation/MyPassengersIcon';
import MoreIcon from '../components/SVGs/BottomNavigation/MoreIcon';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MyPassengersScreen from '../screens/MyPassengersScreen/MyPassengersScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import PassengersByCardinalPoint from '../screens/PassengersByCardinalPoint/PassengersByCardinalPoint';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';

import Colors from '../constants/Colors';

import GoBackButton from '../components/SVGs/GoBackButton/GoBackButtonSVG';

const tabBarOptions = {
  activeTintColor: 'black',
  activeBackgroundColor: '#f7f7f7',
};

const goBackButtonNavOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={{ paddingHorizontal: 10 }}
    >
      <GoBackButton />
    </TouchableOpacity>
  ),
  headerStyle: { shadowColor: 'transparent', borderBottomWidth: 0 },
  navigationOptions: {
    gestureResponseDistance: 50,
  },
});

const HomeStack = createStackNavigator({
  DropOffAllPassengers: HomeScreen,
  CardinalPoint: {
    screen: PassengersByCardinalPoint,
    navigationOptions: goBackButtonNavOptions,
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'All Passengers',
  tabBarIcon: ({ focused }) => {
    return (
      <AllPassengersIcon
        focused={focused}
        tabIconSelected={Colors.tabIconSelected}
        tabIconDefault={Colors.tabIconDefault}
      />
    );
  },
  tabBarOptions,
};

const LinksStack = createStackNavigator({
  DropOffMyPassengers: MyPassengersScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'My Passengers',
  tabBarIcon: ({ focused }) => (
    <MyPassengersIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelected}
      tabIconDefault={Colors.tabIconDefault}
    />
  ),
  tabBarOptions,
};

const SettingsStack = createStackNavigator({
  DropOffMore: SettingsScreen,
  History: {
    screen: HistoryScreen,
    navigationOptions: goBackButtonNavOptions,
  },
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <MoreIcon
      focused={focused}
      tabIconSelected={Colors.tabIconSelected}
      tabIconDefault={Colors.tabIconDefault}
    />
  ),
  tabBarOptions,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
