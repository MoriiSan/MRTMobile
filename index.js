/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Welcome from "./screens/Welcome";
import SetNickname from './screens/SetNickname';
import Home from "./screens/Home";
import Account from "./screens/Account";
import Logs from "./screens/Logs";
import AddCard from "./screens/AddCard";
import Scan from "./screens/Scan";

AppRegistry.registerComponent(appName, () => App);


export {
    Welcome,
    SetNickname,
    Home,
    Account,
    Logs,
    AddCard,
    Scan,
}
