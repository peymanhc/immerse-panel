import {combineReducers} from 'redux';
import pages from './pages.reducer';

const reducer = combineReducers({
	pages,
});

export default reducer;
