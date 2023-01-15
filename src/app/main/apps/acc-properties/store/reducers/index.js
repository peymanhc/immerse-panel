import {combineReducers} from 'redux';
import propertys from './propertys.reducer';
import folders from './folders.reducer';
import labels from './labels.reducer';
import filters from './filters.reducer';
import propertylabels from './propertylabels.reducer';

const reducer = combineReducers({
    propertys,
    folders,
    labels,
    filters,
	propertylabels
});

export default reducer;