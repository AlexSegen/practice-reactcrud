import React, { Component } from "react";
import usersService from "../services/api.service";
class userModal extends Component {
  initialState = {
    loading: false,
    form: {
      username: "",
      name: "",
      email: "",
      phone: ""
    }
  };

  state = this.initialState;

  setLoading = () => {
    let loading = !this.state.loading;
    this.setState({ loading });
  };

  setUser = async () => {
    this.setLoading();
    try {
      const user = await usersService.addUser(this.state.form);
      this.setState(this.initialState);
      this.setLoading();
      this.props.toggleModal();
      this.props.reloadData();
      return user;
    } catch (error) {
      this.setLoading();
      return error;
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  render() {
    const { name, email, username, phone } = this.state.form;

    const { isActive, toggleModal } = this.props;

    return (
      <div className={isActive ? "modal is-active" : "modal"}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <h1>User details</h1> <hr />
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="username"
                    className="input"
                    type="text"
                    placeholder="Text input"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    name="email"
                    type="email"
                    placeholder="Email input"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="phone"
                    placeholder="Text input"
                    value={phone}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className={
                      this.state.loading
                        ? "button is-link is-loading"
                        : "button is-link"
                    }
                    type="button"
                    onClick={this.setUser}
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="button is-text"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          onClick={toggleModal}
          aria-label="close"
        />
      </div>
    );
  }
}

export default userModal;
