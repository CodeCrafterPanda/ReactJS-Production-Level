import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Contact extends Component {
  state = { showContactInfo: false };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header bg-info py-1 text-white">
          <h4>
            {name}{' '}
            <i
              className="fas fa-sort-down"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.setState({
                  showContactInfo: !this.state.showContactInfo
                });
              }}
            />{' '}
            <Link to={`/contact/${id}`}>
              <i
                className="fas fa-arrow-circle-right"
                style={{
                  cursor: 'pointer',
                  float: 'right',
                  marginRight: '15px'
                }}
              />{' '}
            </Link>
          </h4>
        </div>
        {showContactInfo ? (
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">
                <i className="fas fa-at" /> {email}
              </li>
              <li className="list-group-item">
                {' '}
                <i className="fas fa-phone" /> {phone}
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
