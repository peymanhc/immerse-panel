import {combineReducers} from 'redux';
import locations from './locations.reducer';
import heatmap from './heatmap.reducer';

const reducer = combineReducers({
	locations,
	heatmap
});

export default reducer;
