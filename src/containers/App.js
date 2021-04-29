import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import './App.css';

function App () {
	
	/*constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}*/

	// using useState hooks instead of this.state
	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')

	/*componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => this.setState ({ robots : users}))	
	}*/

	//using useEffect hooks instead of componentDidMount() lifecycle
	useEffect(() => {
		return () => {
			fetch('https://jsonplaceholder.typicode.com/users')
			.then(resp => resp.json())
			.then(users => setRobots(users))
		};
	}, []) // passing empty array as a (optional)second parameter to render useEffect() only once to mimic the functionality of componentDidMount() lifecycle

	const onSearchChange = (event) => {
		setSearchfield(event.target.value)
	}


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
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots = {filteredrobots}/>
				</Scroll>
			</div>
		);
	}	
}

export default App;