import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditContact extends Component {
  constructor(props) {
    super(props);
    // create refs
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.phone1Input = React.createRef();
    this.addressInput = React.createRef();
    this.noteInput = React.createRef();
    this.bdayInput = React.createRef();
    this.anniInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();

    const { contact, firestore, history } = this.props;
    // Updated Contact
    const updContact = {
      name: this.nameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      phone1: this.phone1Input.current.value,
      address: this.addressInput.current.value,
      note: this.noteInput.current.value,
      bday: this.bdayInput.current.value,
      anni: this.anniInput.current.value
    };

    // Update contact to firestore
    firestore
      .update({ collection: 'contacts', doc: contact.id }, updContact)
      .then(history.push('/'));
  };

  render() {
    const { contact } = this.props;
    if (contact) {
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
              <h3 className="text-white">Edit Contact</h3>
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
                    ref={this.nameInput}
                    defaultValue={contact.name}
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
                    ref={this.emailInput}
                    defaultValue={contact.email}
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
                    ref={this.phoneInput}
                    defaultValue={contact.phone}
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
                    ref={this.phone1Input}
                    defaultValue={contact.phone1}
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
                    ref={this.addressInput}
                    defaultValue={contact.address}
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
                    ref={this.noteInput}
                    defaultValue={contact.note}
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
                    ref={this.bdayInput}
                    defaultValue={contact.bday}
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
                    ref={this.anniInput}
                    defaultValue={contact.anni}
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
    } else {
      return <Spinner />;
    }
  }
}

EditContact.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(props => [
    { collection: 'contacts', storeAs: 'contact', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    contact: ordered.contact && ordered.contact[0]
  }))
)(EditContact);
