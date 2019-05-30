import React from 'react';
import {Image} from 'react-native';

export default class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./Logo.png')}
        style={{ width: 110, height: 40, marginLeft: 8}}
      />
    );
  }
}
