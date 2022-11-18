import React from 'react';
import { ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/global';

/**
 * Splash screen to display while checking if the user is logged in
 *
 * @returns a component showing the splash screen
 */
export default function SplashScreen() {
  const backgroundImage = require("../../assets/splash.png");

  return (
    <ImageBackground source={backgroundImage} resizeMode="center" style={globalStyles.image} />
  );
}