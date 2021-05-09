import { CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS, REQUEST_ROBOTS_FAILED } from './constants.js'

export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD, //using variable imported from constants instead of directly uing strings to avoid typo errors.
	payload: text
})

//same as (also if constant was not used):-
/*export const setSearchField = (text) => {
	return {
		type: 'CHANGE_SEARCH_FIELD',
		payload: text
	}
}*/

export const requestRobots = () => (dispatch) => { // Using higher order function to return another function //We need to return function to trigger middleware thunk
	dispatch({type: REQUEST_ROBOTS_PENDING});      // In order to use dispatch() method here in actions. it cant be passed as plain object thus should be returned as a function.
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(resp => resp.json())
		.then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
		.catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))
}