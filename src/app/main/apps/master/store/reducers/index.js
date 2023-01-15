import {combineReducers} from 'redux';
import masters from './masters.reducer';
import master from './master.reducer';

const reducer = combineReducers({
    masters,
	master,
});

export default reducer;
