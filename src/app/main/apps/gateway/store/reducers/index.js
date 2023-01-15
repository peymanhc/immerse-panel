import {combineReducers} from 'redux';
import gateways from './gateways.reducer';

const reducer = combineReducers({
	gateways,
});

export default reducer;
