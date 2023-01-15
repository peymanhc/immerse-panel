import {combineReducers} from 'redux';
import addresses from './addresses.reducer';


const reducer = combineReducers({
    addresses,
});

export default reducer;
