import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddDoctor from './components/doctors/AddDoctor';
import DoctorDetails from './components/doctors/DoctorDetails';
import EditDoctor from './components/doctors/EditDoctor';

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

              <Route 
                exact
                path="/doctor/edit/:id"
                component={EditDoctor}
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
