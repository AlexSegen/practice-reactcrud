import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<React.Fragment>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<Link to="/" className="navbar-item">
						<img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28" />
					</Link>

					<a
                        href="/"
						role="button"
						className="navbar-burger burger"
						aria-label="menu"
						aria-expanded="false"
                        data-target="navbarBasicExample"
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>

				<div id="navbarBasicExample" className="navbar-menu">
					<div className="navbar-start">
						<Link to="/" className="navbar-item">
							Home
						</Link>

						<Link to="/users/" className="navbar-item">
							Users
						</Link>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
