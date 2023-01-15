import {combineReducers} from 'redux';
import panels from './panels.reducer';

const reducer = combineReducers({
	panels,
});

export default reducer;
