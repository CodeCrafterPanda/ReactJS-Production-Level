import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import Note from '../notes/Note';
import Spinner from '../layout/Spinner';

class Notes extends Component {
  state = { totalNotes: null, notes: null };

  static getDerivedStateFromProps(props, state) {
    const { notes, auth } = props;

    if (notes) {
      const newNotes = notes.filter(note => note.uid === auth.uid);
      let total = newNotes.length;
      return { totalNotes: total, notes: newNotes };
    }
    return null;
  }

  deleteNote = id => {
    const { firestore } = this.props;
    firestore.delete({ collection: 'notes', doc: id });
  };

  render() {
    // const {  } = this.props;
    const { notes, totalNotes } = this.state;
    if (notes) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12" />
          </div>
          {notes.map(note => (
            <Note
              key={note.id}
              note={note}
              deleteClick={this.deleteNote.bind(this, note.id)}
            />
          ))}
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

Notes.propTypes = {
  firestore: PropTypes.object.isRequired,
  notes: PropTypes.array
};
export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: 'notes' }]),
  connect((state, props) => ({
    notes: state.firestore.ordered.notes,
    auth: state.firebase.auth
  }))
)(Notes);
