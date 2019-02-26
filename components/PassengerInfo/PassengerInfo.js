import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PassengersStyles from '../../styles/Passengers';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';

import FetchAddToMyPassengers from '../../APICalls/FetchAddToMyPassengers';

import {
  passengerCardIdAction,
  isAddToMyPassengersSuccessAction,
  unassignedDropOffPassengersAction,
} from '../../screens/HomeScreen/actions/homeScreen';

const PassengersInfo = ({
  id,
  name,
  address,
  datetime,
  callModal,
  cardinalpoint,
  navigationStore,
  passengerCardIdActionHandler,
  isAddToMyPassengersSuccessActionHandler,
  unassignedDropOffPassengersActionHandler,
}) => {
  const handleAddToMyPassengers = () => {
    FetchAddToMyPassengers(
      id,
      navigationStore,
      passengerCardIdActionHandler,
      unassignedDropOffPassengersActionHandler,
      isAddToMyPassengersSuccessActionHandler,
    );
  };

  return (
    <View>
      <View style={{ height: 30 }} />
      <View>
        <View className="c-tile-list" style={PassengersStyles.CTileList}>
          <View
            className="c-tile-list__item"
            style={PassengersStyles.CTileListItem}
          >
            <View>
              <View style={PassengersStyles.CArticleTileHeader}>
                <View style={PassengersStyles.CardinalPointWrapper}>
                  <Text style={PassengersStyles.CArticleTileCategory}>
                    {cardinalpoint}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 10 }}
                    onPress={callModal}
                  >
                    <View>
                      <Ionicons name="md-more" color="#979797" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={PassengersStyles.CArticleTileBody}>
                <Text
                  style={[
                    PassengersStyles.NameOfClient,
                    {
                      color: navigationStore.index
                        ? Colors.pickupTabColor
                        : Colors.dropOffTabColor,
                    },
                  ]}
                >
                  {name}
                </Text>
                <Text style={PassengersStyles.Address}>{address}</Text>
                <Text style={PassengersStyles.RequestedTimeText}>
                  Requested at{' '}
                  <Text style={PassengersStyles.RequestedTime}>{datetime}</Text>
                </Text>
              </View>

              <View style={PassengersStyles.CArticleTileFooter}>
                <TouchableOpacity
                  onPress={handleAddToMyPassengers}
                  style={[
                    globalStyles.touchableBtnDropOffItem,
                    {
                      backgroundColor: navigationStore.index
                        ? Colors.pickupTabColor
                        : Colors.dropOffTabColor,
                    },
                  ]}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    ADD TO MY PASSENGERS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

PassengersInfo.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
  id: PropTypes.oneOfType([PropTypes.number]).isRequired,
  passengerCardIdActionHandler: PropTypes.func.isRequired,
  name: PropTypes.oneOfType([PropTypes.string]).isRequired,
  address: PropTypes.oneOfType([PropTypes.string]).isRequired,
  callModal: PropTypes.oneOfType([PropTypes.func]).isRequired,
  datetime: PropTypes.oneOfType([PropTypes.string]).isRequired,
  cardinalpoint: PropTypes.oneOfType([PropTypes.string]).isRequired,
  isAddToMyPassengersSuccessActionHandler: PropTypes.func.isRequired,
  unassignedDropOffPassengersActionHandler: PropTypes.func.isRequired,
};

export default compose(
  connect(
    store => ({
      navigationStore: store.homeScreen.navigation,
      passengerCardId: store.homeScreen.passengerCardId,
      isAddToMyPassengersSuccess: store.homeScreen.isAddToMyPassengersSuccess,
      unassignedDropOffPassengers: store.homeScreen.unassignedDropOffPassengers,
    }),
    dispatch => ({
      passengerCardIdActionHandler: id => {
        dispatch(passengerCardIdAction(id));
      },
      unassignedDropOffPassengersActionHandler: data => {
        dispatch(unassignedDropOffPassengersAction(data));
      },
      isAddToMyPassengersSuccessActionHandler: isAddToMyPassengersSuccess => {
        dispatch(isAddToMyPassengersSuccessAction(isAddToMyPassengersSuccess));
      },
    }),
  ),
)(PassengersInfo);
