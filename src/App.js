import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddDoctor from './components/doctors/AddDoctor';
import DoctorDetails from './components/doctors/DoctorDetails';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div>
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route 
                exact
                path="/"
                component={Dashboard}
              />

              <Route 
                exact
                path="/doctor/add"
                component={AddDoctor}
              />

              <Route 
                exact
                path="/doctor/:id"
                component={DoctorDetails}
              />

            </Switch>
          </div>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
