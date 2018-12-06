import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class ContactDetails extends Component {
  // Delete Contact
  onDelete = () => {
    const { contact, firestore, history } = this.props;

    firestore
      .delete({ collection: 'contacts', doc: contact.id })
      .then(history.push('/'));
  };
  render() {
    const { contact } = this.props;
    if (contact) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link mb-1">
                <i className="fas fa-arrow-circle-left" />
                {'  '}
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to={`/contact/edit/${contact.id}`}
                className="btn btn-info btn-block mb-1"
              >
                <i className="fas fa-user-edit text-white" />
                {'  '}
                Edit
              </Link>
            </div>
            <div className="col-md-3">
              <button
                onClick={this.onDelete}
                className="btn btn-danger btn-block mb-1"
              >
                <i className="fas fa-user-minus text-white" />
                {'  '}
                Delete
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header bg-info py-1">
              <h3 className="text-white ">{contact.name}</h3>
            </div>
            <div className="card-body">
              <h4>
                {' '}
                <span className="text-success">"{contact.note}"</span>
              </h4>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-at" /> Email :&nbsp;
                  </span>
                  {contact.email}
                </li>
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-home" /> Phone :&nbsp;
                  </span>{' '}
                  {contact.phone}
                </li>
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-briefcase" /> Phone :&nbsp;
                  </span>{' '}
                  {contact.phone1}
                </li>
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-map-marker-alt" /> Address :&nbsp;
                  </span>{' '}
                  {contact.address}
                </li>
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-birthday-cake" /> Birthday :&nbsp;
                  </span>{' '}
                  {contact.bday}
                </li>
                <li className="list-group-item">
                  <span className="text-primary">
                    <i className="fas fa-birthday-cake" /> Anniversary :&nbsp;
                  </span>{' '}
                  {contact.anni}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ContactDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(props => [
    { collection: 'contacts', storeAs: 'contact', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    contact: ordered.contact && ordered.contact[0]
  }))
)(ContactDetails);
