// DELETE-SHARE-SAVE

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCanSave, selectEmail } from '../../redux/selectors';
import { deleteProject } from '../../redux/actions/actions-project';
import { save } from '../../redux/actions/actions-user';
import { API_BASE_URL } from '../../utils';
import './delete-share-save.css';

class DeleteShareSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick() {
    const jwt = localStorage.getItem('authToken');
    if (!jwt || !this.props.email) {
      // this.setState({ message: 'Please sign in to save your project' });
      this.props.setMessage('Please sign in to save your project');
      return;
    }
    const {
      bpm,
      name,
      tracks,
      shared,
      id,
      canSave,
      setProjectId,
      save,
      setMessage } = this.props;
    if (canSave) {
      if (!id) {
        this.setState({ saving: true });
        axios.post(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared },
          { headers: { Authorization: `Bearer ${jwt}`} }
        )
          .then(res => {
            const { projectId } = res.data;
            setProjectId({ id: projectId });
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            const { error } = e.response.data;
            let errorMessage = error;
            if (error === 'Invalid token')
              errorMessage = 'Please sign in to save your project';
            this.setState({ message: errorMessage, saving: false });
          });
      }
      else {
        this.setState({ saving: true });
        axios.patch(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared, id },
          { headers: { Authorization: `Bearer ${jwt}`}}
        )
          .then(() => {
            save();
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            const { error } = e.response.data;
            let errorMessage = error;
            if (error === 'Invalid token')
              errorMessage = 'Please sign in to save your project';
            // this.setState({ message: errorMessage, saving: false });
            setMessage(errorMessage);
            this.setState({ saving: false });
          });
      }
    }
  }

  handleDeleteClick() {
    const { id, name, deleteProject, setMessage } = this.props;
    const jwt = localStorage.getItem('authToken');

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(
        `${API_BASE_URL}project/${id}`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(() => {
          // window.alert('Project successfully deleted');
          // this.setState({ message: 'Project deleted successfully'});
          setMessage('Project deleted successfully');
          deleteProject();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    }
  }

  handleShareClick() {
    const jwt = localStorage.getItem('authToken');
    const { bpm, name, tracks, id, setMessage } = this.props;
    const shared = true;
    axios.patch(
      `${API_BASE_URL}save`,
      { bpm, name, tracks, shared, id },
      { headers: { Authorization: `Bearer ${jwt}`}}
    )
      .then(() => {
        // this.setState({ message: 'Project shared successfully' });
        setMessage('Project shared successfully');
      })
      .catch(e => {
        console.log(e);
        console.log(e.response);
      });
  }

  render() {
    const { canSave, email, id } = this.props;
    return (
      <div className="delete-share-save">
        {email && id && [
          <button
            className="button-dark project-button"
            key="delete"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>,
          <button
            className="button-dark project-button"
            key="share"
            onClick={this.handleShareClick}
          >
            Share
          </button>
        ]}
        <button
          className="button-dark project-button"
          onClick={this.handleSaveClick}
          disabled={!canSave}
        >
          {this.state.saving
            ? 'Saving'
            : canSave
              ? 'Save'
              : 'Saved'}
        </button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    canSave: selectCanSave(state),
    email: selectEmail(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteProject, save }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteShareSave);
