/**
 * React Native Entry Point
 *
 * This file is the entry point for the Webizen mobile application.
 * It registers the main App component which will be the root of the mobile UI.
 */
import { AppRegistry } from 'react-native';
import App from '../../app/App'; // Assuming the root React component is at app/App.js
import { name as appName } from '../../app/app.json';

// The main component is registered with the AppRegistry.
// This makes it available to the native mobile runtime.
AppRegistry.registerComponent(appName, () => App);