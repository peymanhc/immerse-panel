import {combineReducers} from 'redux';
import dictionarys from './dictionarys.reducer';

const reducer = combineReducers({
	dictionarys,
});

export default reducer;
