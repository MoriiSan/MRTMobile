/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Logs from "./screens/Logs";
import AddCard from "./screens/AddCard";

AppRegistry.registerComponent(appName, () => App);


export {
    Welcome,
    Home,
    Account,
    Logs,
    AddCard,
}
