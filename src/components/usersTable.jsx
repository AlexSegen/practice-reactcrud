import React from "react";
import { Link } from "react-router-dom";

const UsersTable = ({ users, onDelete }) => {
  if (users.length === 0) return <p>No users found</p>;

  return (
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
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
