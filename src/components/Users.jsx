import React from 'react';
import {Link} from "react-router-dom"

const Users = () => {
	return (
        <React.Fragment>
            <h1>Users</h1>
            <hr/>
            <table className="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created At</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link to="/users/details">Alejandro</Link></td>
                        <td>alejandro@mail.com</td>
                        <td>19/07/2017</td>
                        <td><button type="button" className="button">Details</button></td>
                    </tr>
                </tbody>
            </table>

        </React.Fragment>);
};

export default Users;
