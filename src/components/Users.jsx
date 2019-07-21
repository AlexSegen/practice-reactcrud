import React, { Component } from "react";
import { toastme } from "toastmejs";
import usersService from "../services/api.service";
import UsersTable from "./usersTable";
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
        </div>

        <UsersTable
          onDelete={this.deleteUser}
          users={users}
          loading={loading}
        />

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
