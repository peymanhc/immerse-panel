import {combineReducers} from 'redux';
import discounts from './discounts.reducer';
import discount from './discount.reducer';

const reducer = combineReducers({
    discounts,
	discount,
});

export default reducer;
