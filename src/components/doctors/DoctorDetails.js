import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class DoctorDetails extends Component {
    state={
        showDetails: true,
        patientCount : '',
        totalPatient: ''    
    };

    //Update Total Patient
    updateTotalPatient = e =>{
        e.preventDefault();

        console.log(this.state.totalPatient);
        const { doctor, firestore}=this.props;
        const { totalPatient }=this.state;

        const doctorUpdate={            
            totalCount: (parseInt(totalPatient)).toString()
        }

            //Update in fireStore
        firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
        
    }

    //Up Total Count
    upTotalCount = e =>{
        e.preventDefault();

        //  console.log('Work total');
        const { doctor, firestore}=this.props;
        const { patientCount }=this.state;
       
        const doctorUpdate={            
            totalCount: (parseInt(doctor.totalCount)+1).toString()
        }

        //Update in fireStore
        firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
        
    }

    //Down Total Patient
    downTotalCount = e =>{
        e.preventDefault();

        // console.log('Work');
        const { doctor, firestore}=this.props;
        const { patientCount }=this.state;

        if(doctor.totalCount>0){
            const doctorUpdate={            
                totalCount: (parseInt(doctor.totalCount)-1).toString()
            }

            //Update in fireStore
        firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
        }
    }

    //DownCount
    downCount = e =>{
        e.preventDefault();

        // console.log('Work');
        const { doctor, firestore}=this.props;
        const { patientCount }=this.state;

        if(doctor.count>0){
            const doctorUpdate={            
                count: doctor.count-1
            }

            //Update in fireStore
        firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
        }
    }

    //Count Up
    upCount = e =>{
        e.preventDefault();

        // console.log('Work');
        const { doctor, firestore}=this.props;
        const { patientCount }=this.state;

        if(doctor.count<doctor.totalCount){
            const doctorUpdate={
                count: doctor.count+1
            }
    
            //Update in fireStore
            firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
        }        
    }

    //Update Balance
    countSubmit = e =>{
        e.preventDefault();

        // console.log(this.state.patientCount);
        const { doctor, firestore}=this.props;
        const { patientCount }=this.state;

        const doctorUpdate={
            count: parseInt(patientCount)
        }

        //Update in fireStore
        firestore.update({collection: 'doctors', doc:doctor.id}, doctorUpdate);
    }
    //Delete Doctor
    onDeleteClick=()=>{
        const { doctor, firestore, history} = this.props;

        firestore
            .delete({collection: 'doctors', doc:doctor.id})
            .then(history.push('/'));
    }
    

    onChange=e=> this.setState({[e.target.name] : e.target.value});


  render() {
      const { doctor }=this.props;
      const { showDetails, patientCount, totalPatient }=this.state;

      let countForm ='';
      //if balance form should display
      if(showDetails){
        countForm=(
              <form onSubmit={this.countSubmit}>
                  <div className="input-group">
                    <input 
                        type="number"
                        className="form-control" 
                        name="patientCount"
                        placeholder="Add updated Patient Number"
                        value={patientCount}
                        onChange={this.onChange}
                    />
                    <div className="input-group-append">
                        <input type="submit" value="Update" className="btn btn-outline-dark" />
                    </div>
                    <div className="input-group-append" onClick={this.downCount}>
                        <span className="btn btn-outline-dark">Down</span>
                    </div>
                    <div className="input-group-append">
                        <span className="btn btn-outline-dark" onClick={this.upCount}>Up</span>
                    </div>
                  </div>
                  <hr />

                {/* Update Total Patient */}
                  <div className="input-group">
                    <input 
                        type="number"
                        className="form-control" 
                        name="totalPatient"
                        placeholder="Add Total Patient"
                        value={totalPatient}
                        onChange={this.onChange}
                    />
                    <div className="input-group-append" onClick={this.updateTotalPatient}>
                    <span className="btn btn-outline-dark">Update</span>
                    </div>

                    <div className="input-group-append" onClick={this.downTotalCount}>
                        <span className="btn btn-outline-dark">Down</span>
                    </div>

                    <div className="input-group-append">
                        <span className="btn btn-outline-dark" onClick={this.upTotalCount}>Up</span>
                    </div>
                  </div>
              </form>
          )
      }else{
        countForm=null;
      }

      if(doctor){
        return (
            <div>
              <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left"></i>Back To Dashboard
                    </Link>
                </div>

                <div className="col-md-6">
                    <div className="btn-group float-right">
                        <Link to={`/doctor/edit/${doctor.id}`} className="btn btn-dark">
                        Edit
                        </Link>
                        <button onClick={this.onDeleteClick} className="btn btn-danger" >
                            Delete
                        </button>
                    </div>
                </div>
              </div>
              <hr />
              <div className="card">
                <h3 className="card-header">
                    {doctor.firstName} {doctor.lastName}
                </h3>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                            <h4>Doctor ID:{' '} <span className="text-secondary">{doctor.id}</span></h4>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <h3 className="pull-right">
                                Patient Number: 
                                <span 
                                    className={classnames({
                                        'text-danger':doctor.count > 0,
                                        'text-success': doctor.count===0
                                    })}>
                                    {parseInt(doctor.count)} {' '}
                                </span>
                                <span>
                                    /
                                </span>
                                <span className='text-success'>
                                    {' '} {parseInt(doctor.totalCount)} {'     '}
                                </span>
                                <small>
                                    <a href="#!" onClick={()=>this.setState({ showDetails: !this.state.showDetails})}>
                                        {'  '}<i className="fas fa-pencil-alt"></i>
                                    </a>  
                                </small>
                            </h3>       
                            {countForm}
                        </div>
                    </div>

                    <hr />
                    <ul className="list-group">
                        <li className="list-group-item">Field: {doctor.field}</li>
                        <li className="list-group-item">Contact Email: {doctor.email}</li>
                        <li className="list-group-item">Contact Phone: {doctor.phone}</li>
                        <li className="list-group-item">Total Number of Patient: {doctor.totalCount}</li>
                        <li className="list-group-item">Current Queue Number: {doctor.count}</li>
                    </ul>
                </div>
              </div>
            </div>
          )
      }else{
          return <Spinner />
      }    
  }
}

DoctorDetails.propTypes={
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection:'doctors', storeAs:'doctor', doc: props.match.params.id}
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        doctor: ordered.doctor && ordered.doctor[0]
    }))
  )(DoctorDetails);

//   export default DoctorDetails;