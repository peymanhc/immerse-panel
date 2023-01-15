import {combineReducers} from 'redux';
import products from './products.reducer';
import product from './product.reducer';
import accdocs from './accdocs.reducer';
import accdoc from './accdoc.reducer'; 
import accdocsStatus from './accdocsStatus.reducer'; 
const reducer = combineReducers({
    products,
    product,
    accdocs,
    accdoc,
	accdocsStatus, 
});

export default reducer;
