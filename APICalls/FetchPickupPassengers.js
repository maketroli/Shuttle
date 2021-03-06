import { Alert } from 'react-native';

import { has } from 'lodash';

import { API_URL } from '../constants/API';

const FetchPickupPassengers = async (
  unassignedPickUpPassengersActionHandler,
  userToken,
) => {
  if (userToken) {
    try {
      const response = await fetch(`${API_URL}getUnassignedPickUpPassengers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      if (has(responseJson, 'error')) {
        Alert.alert(
          'Error',
          'There was an error trying to fetch Unassigned Pickup Passengers data. Please try again later.',
        );
      } else {
        unassignedPickUpPassengersActionHandler(responseJson.success.data);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'There was an error while attempting to load Unassigned Pickup Passengers data. Please try again later.',
      );
    }
  }
};

export default FetchPickupPassengers;
