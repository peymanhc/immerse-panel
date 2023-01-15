import {combineReducers} from 'redux';
import countries from './countries.reducer';
import cities from './cities.reducer';
import provinces from './provinces.reducer';


const reducer = combineReducers({countries,provinces, cities});

export default reducer;