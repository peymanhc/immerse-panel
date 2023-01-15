import {combineReducers} from 'redux';
import clusterProducts from './clusterProducts.reducer';

const reducer = combineReducers({
    clusterProducts,
});

export default reducer;
