import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

class AddContact extends Component {
  state = {
    uid: '',
    name: '',
    email: '',
    phone: '',
    phone1: '',
    address: '',
    note: '',
    bday: '',
    anni: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { uid: auth.uid };
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newContact = this.state;

    const { firestore, history } = this.props;

    firestore
      .add({ collection: 'contacts' }, newContact)
      .then(() => history.push('/'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />
              {'  '}
              Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header bg-info">
            <h3 className="text-white">Add New Contact</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-user" /> &nbsp;Name
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-at" /> &nbsp;Email
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-home" /> &nbsp;Phone
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-briefcase" /> &nbsp;Phone
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="phone1"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.phone1}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-map-marker-alt" /> &nbsp;Address
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.address}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-sticky-note" /> &nbsp;Note
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="note"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.note}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-birthday-cake" /> &nbsp;Birthday
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="bday"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.bday}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-birthday-cake" /> &nbsp;Anniversary
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="anni"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.anni}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn bg-info btn-block text-white"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AddContact);
