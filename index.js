/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as React from 'react';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/reducer/store';

const ProviderApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default ProviderApp;

AppRegistry.registerComponent(appName, () => ProviderApp);
