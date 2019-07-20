import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toastme } from "toastmejs";
import usersService from "../services/api.service";

import UserModal from "./userModal";
class Users extends Component {
  state = {
    loading: false,
    users: [],
    modalIsActive: false
  };

  setLoading = () => {
    let loading = !this.state.loading;
    this.setState({ loading });
  };

  getUsers = async () => {
    this.setLoading();
    try {
      const users = await usersService.getAll();
      this.setState({ users });
      this.setLoading();
      return users;
    } catch (error) {
      this.setLoading();
      return error;
    }
  };

  toggleModal = () => {
    let modalIsActive = this.state.modalIsActive;
    modalIsActive = !modalIsActive;
    this.setState({ modalIsActive });
  };

  deleteUser = identifier => {
    toastme
      .yesNoDialog({
        title: "Delete this user?",
        text: "This can be reverted.",
        textConfirm: "Confirm",
        textCancel: "Cancel",
        showCancel: true, // true or false
        type: "warning" // 'success', 'danger', 'warning', 'info' or 'question'
      })
      .then(async value => {
        if (value) {
          try {
            await usersService.delete(identifier);
            const users = this.state.users.filter(
              user => user.id !== identifier
            );
            this.setState({ users });
            return true;
          } catch (error) {
            return error;
          }
        }
      });
  };

  componentDidMount() {
    this.getUsers();
    console.log(process.env.NODE_ENV);
  }

  render() {
    const { users, loading } = this.state;
    return (
      <React.Fragment>
        <h1>Users</h1>
        <hr />
        <div className="has-text-right">
          <button
            className="button is-success"
            type="button"
            onClick={this.toggleModal}
          >
            Add user
          </button>
          {loading ? (
            <progress className="progress is-small is-primary" max="100">
              15%
            </progress>
          ) : (
            ""
          )}
        </div>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="has-text-right">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={() => this.deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserModal
          isActive={this.state.modalIsActive}
          toggleModal={this.toggleModal}
          reloadData={this.getUsers}
        />
      </React.Fragment>
    );
  }
}

export default Users;
