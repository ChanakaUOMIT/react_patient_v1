import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class QueueNumber extends Component {
  render() {
      const { doctors }=this.props;
    
      if(doctors){
          return(
              <div>                
                {doctors.map(doctor =>(
                    <div className="card">
                    <h3 className="card-header">
                        Doctor {doctor.firstName} {doctor.lastName}
                    </h3>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="pull-right">
                                <ul className="list-group">
                                    <li className="list-group-item">Field: {doctor.field}</li>
                                    <li className="list-group-item">Contact Email: {doctor.email}</li>
                                    <li className="list-group-item">Contact Phone: {doctor.phone}</li>
                                </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="pull-left">
                                    <div>
                                        Channeling Number
                                    </div>
                                    <div className="text-primary">
                                        <h1>
                                            {doctor.count}
                                        </h1>                                       
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="pull-left">
                                <div>
                                    Total Patient
                                </div>

                                <div className="text-danger">
                                    <h1>
                                        {doctor.totalCount} 
                                    </h1>
                                </div>                                    
                                </div>

                            </div>

                        </div>
                    </div>

                    </div>
                ))}
                    
                <hr />
                
              </div>
          )
      }else{
          return <Spinner />
      }
  }
}

// export default  QueueNumber;

QueueNumber.propTypes={
    firestore: PropTypes.object.isRequired,
    doctors: PropTypes.array.isRequired
}

// export default compose(
//     firestoreConnect(props => [
//         { collection:'doctors', storeAs:'doctor', doc: props.match.params.id}
//     ]),
//     connect(({ firestore: { ordered }}, props) => ({
//         doctor: ordered.doctor && ordered.doctor[0]
//     }))
//   )(QueueNumber);

export default compose(
    firestoreConnect([{ collection : 'doctors'}]),
    connect((state, props) => ({
      doctors: state.firestore.ordered.doctors
    }))
  )(QueueNumber);
