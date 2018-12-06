import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

class AddNote extends Component {
  state = {
    uid: '',
    title: '',
    description: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { uid: auth.uid };
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newNote = this.state;

    const { firestore, history } = this.props;

    firestore
      .add({ collection: 'notes' }, newNote)
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
            <h3 className="text-white">Add New Note</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-heading" /> &nbsp;Title
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div className="input-group mt-3 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="fas fa-file-alt" /> &nbsp;Description
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  minLength="2"
                  onChange={this.onChange}
                  value={this.state.description}
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

AddNote.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AddNote);
