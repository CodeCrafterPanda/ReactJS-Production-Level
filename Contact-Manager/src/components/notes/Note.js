import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {
  // Delete Contact
  onDelete = () => {
    this.props.deleteClick();
  };
  render() {
    const { id, title, description } = this.props.note;
    return (
      <div className="card mb-3">
        <div className="card-header bg-info py-1 text-white">
          <h4>
            {title}{' '}
            <i
              className="fas fa-times text-danger"
              style={{
                cursor: 'pointer',
                float: 'right',
                marginRight: '15px'
              }}
              onClick={this.onDelete}
            />
          </h4>
        </div>

        <div className="card-body">
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
Note.propTypes = {
  note: PropTypes.object.isRequired
};
export default Note;
