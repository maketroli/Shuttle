import React from 'react';
import { Svg } from 'expo';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

const dropOffTabColor = '#ff5252';
const pickupTabColor = '#3DA7DC';

const GoBackButton = ({ navigationStore }) => (
  <Svg width="84" height="18">
    <Svg.G fill="none" fillRule="evenodd">
      <Svg.Text
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="22"
        fontWeight="600"
        fill="#474350"
        transform="translate(-4 -4)"
      >
        <Svg.TSpan x="30" y="21">
          {'Back'}
        </Svg.TSpan>
      </Svg.Text>
      <Svg.Path d="M-4-2h24v24H-4z" />
      <Svg.Path
        fill={navigationStore.index ? pickupTabColor : dropOffTabColor}
        fillRule="nonzero"
        d="M16 9H3.83l5.59-5.59L8 2l-8 8 8 8 1.41-1.41L3.83 11H16z"
      />
    </Svg.G>
  </Svg>
);

GoBackButton.propTypes = {
  navigationStore: PropTypes.shape({}).isRequired,
};

export default compose(
  connect(store => ({
    navigationStore: store.homeScreen.navigation,
  })),
)(GoBackButton);
