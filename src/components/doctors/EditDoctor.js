import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditDoctor extends Component {
    constructor(props){
        super(props);
        //Create refs
        this.firstNameInput=React.createRef();
        this.lastNameInput=React.createRef();
        this.fieldInput=React.createRef();
        this.emailInput=React.createRef();
        this.phoneInput=React.createRef();        
    }

    onSubmit=e=>{
        e.preventDefault();

        const { doctor, firestore, history }= this.props;

        //update Doctor
        const updDoctor={
            firstName:this.firstNameInput.current.value,
            lastName:this.lastNameInput.current.value,
            field:this.fieldInput.current.value,
            email:this.emailInput.current.value,
            phone:this.phoneInput.current.value,
        }

        //Update Doctor in Firestore
        firestore
            .update({collection:'doctors', doc:doctor.id}, updDoctor)
            .then(history.push('/'));
    }
  render() {
      const { doctor } =this.props;

    if( doctor ){
        return (
            <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left "></i> Back To Doctor Panel
            </Link>
          </div>
        </div>

        <div className="card">
            <div className="card-header">Add Client</div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="firstName"
                            minLength="2"
                            required
                            ref={this.firstNameInput}
                            onChange={this.onChange}
                            defaultValue={doctor.firstName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="lastName"
                            minLength="2"
                            required
                            ref={this.lastNameInput}
                            onChange={this.onChange}
                            defaultValue={doctor.lastName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Field</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="field"
                            required
                            ref={this.fieldInput}
                            onChange={this.onChange}
                            defaultValue={doctor.field}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            name="email"
                            ref={this.emailInput}
                            onChange={this.onChange}
                            defaultValue={doctor.email}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="phone"
                            minLength="10"
                            required
                            ref={this.phoneInput}
                            onChange={this.onChange}
                            defaultValue={doctor.phone}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary btn-block"
                    />
                </form>
            </div>
        </div>
      </div>
        );
    }else{
        return <Spinner />
    }
  }
}

// export default EditDoctor;

EditDoctor.propTypes={
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        { collection:'doctors', storeAs:'doctor', doc: props.match.params.id}
    ]),
    connect(({ firestore: { ordered }}, props) => ({
        doctor: ordered.doctor && ordered.doctor[0]
    }))
  )(EditDoctor);