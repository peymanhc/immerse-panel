import {combineReducers} from 'redux';
import categorys from './categorys.reducer';
import folders from './folders.reducer';
import labels from './labels.reducer';
import filters from './filters.reducer';
import categorylabels from './categorylabels.reducer';

const reducer = combineReducers({
    categorys,
    folders,
    labels,
    filters,
	categorylabels
});

export default reducer;
