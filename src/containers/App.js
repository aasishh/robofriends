import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)), // no need of middleware here because passed action is plain object
		onRequestRobots: () => dispatch(requestRobots()) //We need middleware to dispatch functions that returns functions
	  //onRequestRobots: () => requestRobots(dispatch) //another way is calling function and passing dispatch method to actions if higher order function is not used. 
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredrobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase()) 
			// here, includes() method compares name and searchfield. we can use if statement also. 
			// toLowerCase() method helps to compare two object/array with worrying about lower/upper case. 
		})
		if (isPending){
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
