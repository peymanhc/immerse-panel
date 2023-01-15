import {combineReducers} from 'redux';
import stores from './stores.reducer';

const reducer = combineReducers({
	stores,
});

export default reducer;
