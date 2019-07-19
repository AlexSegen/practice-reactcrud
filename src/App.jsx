import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Navbar from './components/commons/navbar';
import './App.css';

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="container">
				<Route path="/" exact component={Home} />
				<Route path="/users" exact component={Users} />
				<Route path="/users/:id" component={UserDetails} />
			</div>
		</div>
	);
}

export default App;
