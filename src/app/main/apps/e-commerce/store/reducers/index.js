import {combineReducers} from 'redux';
import products from './products.reducer';
import product from './product.reducer';
import orders from './orders.reducer';
import order from './order.reducer';
import newOrder from './newOrder.reducer';
import ordersStatus from './ordersStatus.reducer';
import warrantylist from './warrantylist.reducer'; 
import warranty from './warranty.reducer';
import newWarranty from './newWarranty.reducer';
import warrantylistStatus from './warrantylistStatus.reducer';
import treeCategory from './treeCategory.reducer';

const reducer = combineReducers({
    products,
    product,
    orders,
    order,
	ordersStatus,
	newOrder,
	warrantylist,
    warranty,
	warrantylistStatus,
	newWarranty,
	treeCategory,
});

export default reducer;
