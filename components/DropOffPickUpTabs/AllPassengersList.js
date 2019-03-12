import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { compose } from 'redux';
import { connect } from 'react-redux';

import globalStyles from '../../styles/GlobalStyles';
import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';

import PassengerCardBasedOnRoute from '../PassengerInfo/PassengerCardBasedOnRoute';
import PassengersAdded from '../PassengerInfo/PassengersAdded';

import {
  isAddToMyPassengersSuccessAction,
  screenNameAction,
  searchParamAction,
  toggleSearchAction,
  unassignedDropOffPassengersAction,
  unassignedPickUpPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

import SearchBox from '../SearchBox/SearchBox';
import FetchUndoAddToMyPassenger from '../../APICalls/FetchUndoAddToMyPassenger';
import { toggleAddPassengerModalAction } from '../PopupsModals/actions/popupsModals';
import { passengersByCardinalPointDataAction } from '../../screens/PassengersByCardinalPoint/actions/passengersByCardinalPoint';

class AllPassengersList extends Component {
  componentDidMount() {
    const { toggleSearch, toggleSearchActionHandler } = this.props;

    this.toggleSearchBarVisibility();
    if (!toggleSearch) toggleSearchActionHandler();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchParam,
      toggleSearch,
      navigationStore,
      passengerCardId,
      pickupPassengerCardId,
      toggleAddPassengerModal,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      isAddToMyPassengersSuccess,
      unassignedDropOffPassengers,
      passengersByCardinalPointData,
    } = this.props;

    return (
      nextProps.searchParam !== searchParam ||
      nextProps.toggleSearch !== toggleSearch ||
      nextProps.navigationStore !== navigationStore ||
      nextProps.passengerCardId !== passengerCardId ||
      nextProps.pickupPassengerCardId !== pickupPassengerCardId ||
      nextProps.toggleAddPassengerModal !== toggleAddPassengerModal ||
      nextProps.searchParamActionHandler !== searchParamActionHandler ||
      nextProps.unassignedPickUpPassengers !== unassignedPickUpPassengers ||
      nextProps.isAddToMyPassengersSuccess !== isAddToMyPassengersSuccess ||
      nextProps.unassignedDropOffPassengers !== unassignedDropOffPassengers ||
      nextProps.passengersByCardinalPointData !== passengersByCardinalPointData
    );
  }

  handleUndo = async id => {
    const {
      navigationStore,
      passengersGoingTo,
      screenNameActionHandler,
      unassignedPickUpPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    } = this.props;

    await screenNameActionHandler('PassengerCardBasedOnRoute');

    return FetchUndoAddToMyPassenger(
      id,
      null,
      navigationStore,
      passengersGoingTo,
      isAddToMyPassengersSuccessActionHandler,
      unassignedPickUpPassengersActionHandler,
      unassignedDropOffPassengersActionHandler,
      passengersByCardinalPointDataActionHandler,
    );
  };

  toggleSearchBarVisibility = () => {
    const {
      toggleSearch,
      searchParamActionHandler,
      toggleSearchActionHandler,
    } = this.props;

    toggleSearchActionHandler();

    if (toggleSearch) searchParamActionHandler('');
  };

  showSuccessMessageBasedOnRoute = (nav, isSuccess, cardId) => {
    const { screenName } = this.props;
    return screenName === 'PassengerCardBasedOnRoute' &&
      nav &&
      isSuccess &&
      cardId ? (
      <PassengersAdded
        id={cardId}
        key={cardId}
        handleUndo={() => this.handleUndo(cardId)}
      />
    ) : null;
  };

  render() {
    const {
      searchParam,
      toggleSearch,
      navigationStore,
      passengerCardId,
      pickupPassengerCardId,
      searchParamActionHandler,
      unassignedPickUpPassengers,
      isAddToMyPassengersSuccess,
      unassignedDropOffPassengers,
      toggleAddPassengerModalActionHandler,
    } = this.props;
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
            onPress={toggleAddPassengerModalActionHandler}
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
        {toggleSearch && (
          <SearchBox
            onChangeText={text => searchParamActionHandler(text)}
            searchParam={searchParam}
          />
        )}

        {this.showSuccessMessageBasedOnRoute(
          !navigationStore.index,
          isAddToMyPassengersSuccess,
          passengerCardId,
        )}

        {this.showSuccessMessageBasedOnRoute(
          navigationStore.index,
          isAddToMyPassengersSuccess,
          pickupPassengerCardId,
        )}

        <PassengerCardBasedOnRoute searchParam={searchParam} />
      </View>
    );
  }
}

AllPassengersList.defaultProps = {
  screenName: '',
  passengerCardId: '',
  passengersGoingTo: '',
  pickupPassengerCardId: '',
};

AllPassengersList.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  screenNameActionHandler: PropTypes.func.isRequired,
  screenName: PropTypes.oneOfType([PropTypes.string]),
  passengerCardId: PropTypes.oneOfType([PropTypes.number]),
  passengersGoingTo: PropTypes.oneOfType([PropTypes.string]),
  pickupPassengerCardId: PropTypes.oneOfType([PropTypes.number]),
  toggleSearch: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  searchParam: PropTypes.oneOfType([PropTypes.string]).isRequired,
  toggleAddPassengerModalActionHandler: PropTypes.func.isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
  passengersByCardinalPointDataActionHandler: PropTypes.func.isRequired,
  toggleAddPassengerModal: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  searchParamActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  toggleSearchActionHandler: PropTypes.oneOfType([PropTypes.func]).isRequired,
  isAddToMyPassengersSuccess: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  unassignedPickUpPassengers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  passengersByCardinalPointData: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
  unassignedDropOffPassengers: PropTypes.oneOfType([PropTypes.array])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      screenName: store.homeScreen.screenName,
      searchParam: store.homeScreen.searchParam,
      toggleSearch: store.homeScreen.toggleSearch,
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      passengersGoingTo: store.homeScreen.passengersGoingTo,
      pickupPassengerCardId: store.homeScreen.pickupPassengerCardId,
      toggleAddPassengerModal: store.popupsModals.toggleAddPassengerModal,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
      passengersByCardinalPointData:
        store.passengersByCardinalPoint.passengersByCardinalPointData,
    }),
    dispatch => ({
      toggleSearchActionHandler: () => {
        dispatch(toggleSearchAction());
      },
      screenNameActionHandler: value => {
        dispatch(screenNameAction(value));
      },
      searchParamActionHandler: value => {
        dispatch(searchParamAction(value));
      },
      toggleAddPassengerModalActionHandler: () => {
        dispatch(toggleAddPassengerModalAction());
      },
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      isAddToMyPassengersSuccessActionHandler: value => {
        dispatch(isAddToMyPassengersSuccessAction(value));
      },
      passengersByCardinalPointDataActionHandler: data => {
        dispatch(passengersByCardinalPointDataAction(data));
      },
    }),
  ),
)(AllPassengersList);
