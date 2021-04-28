import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => this.setState ({ robots : users}))	
	}

	onSearchChange = (event) => {
		this.setState ({searchfield : event.target.value})
	
		// passing robots object manually, not using REST API

		// a step before a DRY way to understand how filter() works...
		// basically using 'robots' array to filter required array elements only.
		
		/*const matchsearch = (robot) => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		}
		const filteredrobots = this.state.robots.filter(matchsearch)
		console.log(filteredrobots)
		*/

		// OR using DRY way,

		/*
		const filteredrobots = this.state.robots.filter((robot) => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) // here, includes() method compares name and searchfield. we can use if statement also. 
		})
		*/
	}

	render() {
		const {robots, searchfield} = this.state;
		const filteredrobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase()) 
			// here, includes() method compares name and searchfield. we can use if statement also. 
			// toLowerCase() method helps to compare two object/array with worrying about lower/upper case. 
		})
		if (!robots.length){
			return <h1 className='tc'>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots = {filteredrobots}/>
					</Scroll>
				</div>
			);
		}	
	}
}

export default App;