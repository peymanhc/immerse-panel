import {combineReducers} from 'redux';
import countries from './countries.reducer';
import cities from './cities.reducer';

const reducer = combineReducers({countries, cities});

export default reducer;