import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddDoctor extends Component {

  state={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    field:'',
    totalCount:'0',
    count:0
  };

  onChange=e=>{
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const newDoctor=this.state;

    const { firestore, history } =this.props;

    firestore
      .add({collection: 'doctors'}, newDoctor)
      .then(() => history.push('/'));
}

  render() {
    return (
        // <h1>Add Doctor</h1>
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left "></i> Back To Doctor Panel
            </Link>
          </div>
        </div>

        <div className="card">
            <div className="card-header">Add Doctor</div>
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
                            onChange={this.onChange}
                            value={this.state.firstName}
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
                            onChange={this.onChange}
                            value={this.state.lastName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Field</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="field"
                            required
                            onChange={this.onChange}
                            value={this.state.field}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
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
                            onChange={this.onChange}
                            value={this.state.phone}
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
  } 
}

AddDoctor.propTypes={
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default firestoreConnect()(AddDoctor);

// export default compose(
//   firestoreConnect(),
//   connect((state, props) =>({
//       settings:state.settings
//   }))
// )(AddDoctor);

// export default AddDoctor;