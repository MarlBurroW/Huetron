import React, { Component } from 'react';
import './App.css';
import defaultTheme from './themes/default';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LightScreen from './screens/LightsScreen';
import BridgeScreen from './screens/BridgesScreen';
import AppLayout from './components/AppLayout';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store/store';

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <MuiThemeProvider theme={defaultTheme}>
          <Router>
            <AppLayout>
              <Route path="/bridges" exact component={BridgeScreen} />
              <Route path="/lights" exact component={LightScreen} />
              <Route path="/groups" component={LightScreen} />
              <Route path="/rooms" component={LightScreen} />
            </AppLayout>
          </Router>
        </MuiThemeProvider>
      </ReduxProvider>
    );
  }
}

export default App;
