import React from 'react';
import { ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/global';

/**
 *
 * @returns Component with loading text
 */
export default function SplashScreen() {
  const backgroundImage = require("../../assets/splash.png");

  return (
    <ImageBackground source={backgroundImage} resizeMode="center" style={globalStyles.image} />
  );
}