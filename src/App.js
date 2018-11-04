import React, { Component } from 'react';
//import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';
import { Provider } from 'react-redux';
import store from './store'; 
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddDoctor from './components/doctors/AddDoctor';
import DoctorDetails from './components/doctors/DoctorDetails';
import EditDoctor from './components/doctors/EditDoctor';
import QueueNumber from './components/patient/QueueNumber';
import Login from './components/auth/Login';
import Settings from './components/settings/Settings';
import Registration from './components/auth/Registration';

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
                component={UserIsAuthenticated(Dashboard)}
              />

              <Route 
                exact
                path="/doctor/add"
                component={UserIsAuthenticated(AddDoctor)}
              />

              <Route 
                exact
                path="/doctor/:id"
                component={UserIsAuthenticated(DoctorDetails)}
              />

              <Route 
                exact
                path="/doctor/edit/:id"
                component={UserIsAuthenticated(EditDoctor)}
              />

              <Route 
                exact
                path="/queuenumber"
                component={UserIsAuthenticated(QueueNumber) || UserIsNotAuthenticated(QueueNumber) }
              />

              <Route 
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />

               <Route 
                exact
                path="/register"
                component={UserIsNotAuthenticated(Registration)}
              />

              <Route 
                exact
                path="/settings"
                component={UserIsAuthenticated(Settings)}
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
