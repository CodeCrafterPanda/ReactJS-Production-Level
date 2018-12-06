import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import Contact from '../contacts/Contact';
import Spinner from '../layout/Spinner';

class Contacts extends Component {
  state = { totalContacts: null, contacts: null };

  static getDerivedStateFromProps(props, state) {
    const { contacts, auth } = props;

    if (contacts) {
      const newContacts = contacts.filter(contact => contact.uid === auth.uid);
      let total = newContacts.length;
      return { totalContacts: total, contacts: newContacts };
    }
    return null;
  }

  render() {
    // const {  } = this.props;
    const { contacts, totalContacts } = this.state;
    if (contacts) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12" />
          </div>
          {contacts.map(contact => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

Contacts.propTypes = {
  firestore: PropTypes.object.isRequired,
  contacts: PropTypes.array
};
export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: 'contacts' }]),
  connect((state, props) => ({
    contacts: state.firestore.ordered.contacts,
    auth: state.firebase.auth
  }))
)(Contacts);
