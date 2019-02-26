import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import globalStyles from '../../styles/GlobalStyles';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';
import PassengerCardBasedOnRoute from '../PassengerInfo/PassengerCardBasedOnRoute';
import { searchParamAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersList extends Component {
  constructor() {
    super();
    this.searchRef = React.createRef();
    this.state = { isVisible: false };
  }

  toggleSearchBarVisibility = async () => {
    const { isVisible } = this.state;
    const { searchParamActionHandler } = this.props;

    await this.setState({ isVisible: !isVisible });

    if (isVisible) searchParamActionHandler('');
  };

  render() {
    const {
      searchParam,
      navigationStore,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      unassignedDropOffPassengers,
    } = this.props;
    const { isVisible } = this.state;
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ height: 50 }} />
        <View style={{ textAlign: 'left', alignSelf: 'stretch' }}>
          <Text style={{ fontWeight: 'bold', color: '#000000' }}>
            All Passengers List (
            {navigationStore.index
              ? unassignedPickUpPassengers.length
              : unassignedDropOffPassengers.length}
            )
          </Text>
        </View>
        <View style={globalStyles.stretchContent}>
          <TouchableOpacity
            onPress={this.toggleSearchBarVisibility}
            style={[
              globalStyles.touchableBtnDropOffItem,
              {
                backgroundColor: navigationStore.index
                  ? Colors.pickupTabColor
                  : Colors.dropOffTabColor,
                marginTop: 20,
              },
            ]}
          >
            <Ionicons name="md-search" color="#fff" size={14} />
            <Text
              style={[
                globalStyles.fontWhite,
                PassengersStyles.ButtonTextIconMargin,
              ]}
            >
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.touchableBtnDropOffItem,
              {
                backgroundColor: navigationStore.index
                  ? Colors.pickupTabColor
                  : Colors.dropOffTabColor,
                marginTop: 20,
              },
            ]}
          >
            <Ionicons name="md-add" color="#fff" size={14} />
            <Text
              style={[
                globalStyles.fontWhite,
                PassengersStyles.ButtonTextIconMargin,
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
        {isVisible && (
          <View>
            <TextInput
              autoFocus
              style={PassengersStyles.SearchBox}
              onChangeText={text => searchParamActionHandler(text)}
              value={searchParam}
              placeholder="Search..."
              autoCapitalize="none"
              ref={this.searchRef}
            />
          </View>
        )}
        <PassengerCardBasedOnRoute searchParam={searchParam} />
      </View>
    );
  }
}

AllPassengersList.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  searchParamActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      searchParam: store.homeScreen.searchParam,
      navigationStore: store.homeScreen.navigation,
      passengersData: store.homeScreen.passengersData,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      searchParamActionHandler: value => {
        dispatch(searchParamAction(value));
      },
    }),
  ),
)(AllPassengersList);
