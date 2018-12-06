import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import Contacts from '../contacts/Contacts';
import Notes from '../notes/Notes';

class Dashboard extends Component {
  state = { totalContacts: null };

  static getDerivedStateFromProps(props, state) {
    const { contacts, auth } = props;

    if (contacts) {
      const newContacts = contacts.filter(contact => contact.uid === auth.uid);
      let total = newContacts.length;
      return { totalContacts: total };
    }

    return null;
  }
  render() {
    const { totalContacts } = this.state;
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header bg-primary py-1 text-white">
              <h4>
                {' '}
                <i className="fas fa-address-card" /> Contacts:
                <span className="text-secondary"> ({totalContacts})</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Contacts />
        </div>
        <div className="col-md-3">
          <Notes />
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  firestore: PropTypes.object.isRequired,
  contacts: PropTypes.array
};
export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: 'contacts' }]),
  // firestoreConnect([{ collection: 'notes' }]),
  connect((state, props) => ({
    contacts: state.firestore.ordered.contacts,
    notes: state.firestore.ordered.notes,
    auth: state.firebase.auth
  }))
)(Dashboard);
