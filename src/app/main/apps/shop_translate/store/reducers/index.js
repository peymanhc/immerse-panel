import {combineReducers} from 'redux';
import shops from './shops.reducer';

const reducer = combineReducers({
	shops,
});

export default reducer;
