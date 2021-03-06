import { Alert, AsyncStorage } from 'react-native';

import { has } from 'lodash';

import FetchAssignedPassengers from './FetchMyAssignedPassengers';

import { API_URL } from '../constants/API';

const FetchDropOffPickUpConfirmation = async (
  // These are params. So be careful before you change its order
  passengerId,
  navigationStore,
  myPassengerCardIdActionHandler,
  assignedPassengersDataActionHandler,
  myPassengerCardIdPickUpActionHandler,
  dropOffPickUpConfirmationSuccessActionHandler,
) => {
  let responseJson;
  const userToken = await AsyncStorage.getItem('userToken');
  const route = navigationStore.index ? 'PickUp' : 'DropOff';

  try {
    const response = await fetch(
      `${API_URL}confirm${route === 'DropOff' ? 'DropOff' : 'PickUp'}`,
      {
        method: 'POST',
        body: JSON.stringify({ id: passengerId }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    responseJson = await response.json();

    if (has(responseJson, 'error')) {
      Alert.alert('Error', 'Unable to process your request at this time.');
    } else {
      await dropOffPickUpConfirmationSuccessActionHandler(responseJson.success);
      if (route === 'DropOff') {
        myPassengerCardIdActionHandler(passengerId);
      } else {
        myPassengerCardIdPickUpActionHandler(passengerId);
      }
      return FetchAssignedPassengers(
        navigationStore,
        assignedPassengersDataActionHandler,
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'There was an error with your request, please try again later.',
    );
  }

  return responseJson;
};

export default FetchDropOffPickUpConfirmation;
