import { CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS, REQUEST_ROBOTS_FAILED } from './constants.js'

const initialStateSearch = {
	searchField: ''
}

export const searchRobots = (state=initialStateSearch, action={}) => {
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {searchField: action.payload})  // returns new state object with updated searchField property
			//return Object.assign{...state, {searchField: action.payload}}	// using object spread operator instead of Object.assign
		default:                                                            // Object.assign gives the object cloning ability (pass by reference)
			return state;
	}
}

const initialStateRobots = {
	isPending: false,
	robots: [],
	error: ''

}

export const requestRobots = (state=initialStateRobots, action={}) => {
	switch(action.type) {
		case REQUEST_ROBOTS_PENDING:
			return Object.assign({}, state, {isPending: true})
		case REQUEST_ROBOTS_SUCCESS:
			return Object.assign({}, state, {robots: action.payload, isPending: false})
		case REQUEST_ROBOTS_FAILED:
			return Object.assign({}, state, {error: action.payload, isPending: false})
		default:
			return state;
	}
}