import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Sidebar from './Sidebar';
import Doctors from '../doctors/Doctors';

class Dashboard extends Component {
   
    render(){
        const { disableBalanceOnAdd }=this.props.settings;
        return (
            <div className="row">
                <div className="col-md-10">
                    <Doctors />
                </div>
        
                <div className="col-md-2">
                    <Sidebar />                    
                </div>
              
            </div>
          )
    }
  
}

// export default Dashboard;

Dashboard.propTypes={
    // firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  }
  
//   export default firestoreConnect()(AddDoctor);
  
  export default compose(
    firestoreConnect(),
    connect((state, props) =>({
        settings:state.settings
    }))
  )(Dashboard);
