import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import usersService from '../services/api.service';
class Users extends Component {
	state = {
		users: []
	};

	getUsers = async () => {
		try {
			const users = await usersService.getAll();
			this.setState({ users });
			return users;
		} catch (error) {
			return error;
		}
	};

	deleteUser = async (identifier) => {
		try {
			await usersService.delete(identifier);
			const users = this.state.users.filter((user) => user.id !== identifier);
			this.setState({ users });
			return true;
		} catch (error) {
			return error;
		}
	};

	componentDidMount() {
		this.getUsers();
	}

	render() {
		const { users } = this.state;
		return (
			<React.Fragment>
				<h1>Users</h1>
				<hr />
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
						{users.map((user) => (
							<tr key={user.id}>
								<td>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>
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
			</React.Fragment>
		);
	}
}

export default Users;
