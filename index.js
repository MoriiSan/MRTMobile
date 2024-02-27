/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";

AppRegistry.registerComponent(appName, () => App);


export {
    Welcome,
    Home,
}
