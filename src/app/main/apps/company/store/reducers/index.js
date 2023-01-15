import {combineReducers} from 'redux';
import companies from './companies.reducer';
import company from './company.reducer';

const reducer = combineReducers({
    companies,
	company,
});

export default reducer;
