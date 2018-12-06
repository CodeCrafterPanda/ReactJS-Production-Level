import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Sidebar from '../layout/Sidebar';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .createUser({
        email,
        password
      })
      .catch(err => alert('This user already exists'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mb-5">
              <div className="card-header bg-info text-center py-1">
                <h3 className="text-white">
                  {' '}
                  <i className="fas fa-plus" /> Register{' '}
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <i className="fas fa-at" /> &nbsp;Email
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group mt-3 mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        <i className="fas fa-key" /> &nbsp;Password
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-block bg-info text-white"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired
};
export default firebaseConnect()(Register);
