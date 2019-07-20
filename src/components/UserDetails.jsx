import React, { Component } from "react";
import { Link } from "react-router-dom";
import usersService from "../services/api.service";

class UserDetails extends Component {
  initialState = {
    form: {
      username: "",
      name: "",
      email: "",
      phone: ""
    }
  };

  state = this.initialState;

  getUser = async identifier => {
    try {
      const user = await usersService.getOne(identifier);
      this.setState({ form: user });
      return user;
    } catch (error) {
      return error;
    }
  };

  setUser = async () => {
    try {
      const user = await usersService.updateUser(
        this.props.match.params.id,
        this.state.form
      );
      this.setState({ form: user });
      return user;
    } catch (error) {
      return error;
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  };

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  render() {
    const { name, email, username, phone } = this.state.form;
    return (
      <React.Fragment>
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
              className="button is-link"
              type="button"
              onClick={this.setUser}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <Link className="button is-text" to="/users">
              Cancel
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserDetails;
