import React, { Component } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import AllPassengersContainer from './AllPassengersContainer';

import FetchPickupPassengers from '../../APICalls/FetchPickupPassengers';

import { unassignedPickUpPassengersAction } from '../../screens/HomeScreen/actions/homeScreen';

class AllPassengersPickup extends Component {
  state = { refreshing: false };

  componentDidMount() {
    const { unassignedPickUpPassengersActionHandler, userToken } = this.props;
    FetchPickupPassengers(unassignedPickUpPassengersActionHandler, userToken);
  }

  shouldComponentUpdate(props, state) {
    const { refreshing } = this.state;
    const { pushNotificationData, userToken } = this.props;

    return (
      props.userToken !== userToken ||
      state.refreshing !== refreshing ||
      props.pushNotificationData !== pushNotificationData
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      userToken,
      pushNotificationData,
      unassignedPickUpPassengersActionHandler,
    } = this.props;
    if (
      prevProps.userToken !== userToken ||
      prevProps.pushNotificationData !== pushNotificationData
    ) {
      FetchPickupPassengers(unassignedPickUpPassengersActionHandler, userToken);
    }
  }

  onRefresh = async () => {
    const { unassignedPickUpPassengersActionHandler, userToken } = this.props;
    this.setState({ refreshing: true });
    await FetchPickupPassengers(
      unassignedPickUpPassengersActionHandler,
      userToken,
    );
    this.setState({ refreshing: false });
  };

  render() {
    const { refreshing } = this.state;
    const { pickupTabColor } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <AllPassengersContainer fill={pickupTabColor} />
      </ScrollView>
    );
  }
}

AllPassengersPickup.defaultProps = {
  userToken: '',
  pushNotificationData: {},
};

AllPassengersPickup.propTypes = {
  pushNotificationData: PropTypes.shape({}),
  userToken: PropTypes.oneOfType([PropTypes.string]),
  navigationStore: PropTypes.shape({}).isRequired,
  pickupTabColor: PropTypes.oneOfType([PropTypes.string]).isRequired,
  unassignedPickUpPassengersActionHandler: PropTypes.oneOfType([PropTypes.func])
    .isRequired,
};

export default compose(
  connect(
    store => ({
      userToken: store.signinScreen.userToken,
      navigationStore: store.homeScreen.navigation,
      pickupTabColor: store.homeScreen.pickupTabColor,
      pushNotificationData: store.globalStore.pushNotificationData,
      unassignedPickUpPassengers: store.homeScreen.unassignedPickUpPassengers,
    }),
    dispatch => ({
      unassignedPickUpPassengersActionHandler: data => {
        dispatch(unassignedPickUpPassengersAction(data));
      },
    }),
  ),
)(AllPassengersPickup);
