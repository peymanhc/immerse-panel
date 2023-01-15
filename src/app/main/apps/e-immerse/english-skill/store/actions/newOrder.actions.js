// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import {showMessage} from 'app/store/actions/fuse';


export const CLOSE_ADD_ORDER_USER_DIALOG	= '[E-EMMERSE APP] CLOSE ADD ORDER USER DIALOG';
export const OPEN_ADD_ORDER_USER_DIALOG		= '[E-EMMERSE APP] OPEN ADD ORDER USER DIALOG';
export const CLOSE_ADD_ORDER_PRODUCT_DIALOG	= '[E-EMMERSE APP] CLOSE ADD ORDER PRODUCT DIALOG';
export const OPEN_ADD_ORDER_PRODUCT_DIALOG	= '[E-EMMERSE APP] OPEN ADD ORDER PRODUCT DIALOG';
export const CLOSE_ADD_ORDER_DISCOUNT_DIALOG= '[E-EMMERSE APP] CLOSE ADD ORDER DISCOUNT DIALOG';
export const OPEN_ADD_ORDER_DISCOUNT_DIALOG	= '[E-EMMERSE APP] OPEN ADD ORDER DISCOUNT DIALOG';
export const CLOSE_ADD_ORDER_TAX_DIALOG		= '[E-EMMERSE APP] CLOSE ADD ORDER TAX DIALOG';
export const OPEN_ADD_ORDER_TAX_DIALOG		= '[E-EMMERSE APP] OPEN ADD ORDER TAX DIALOG';
export const NEW_ORDER_GET_USERS 			= '[E-EMMERSE APP] NEW ORDER GET USERS';
export const NEW_ORDER_GET_ADDRESSES 		= '[E-EMMERSE APP] NEW ORDER GET ADDRESSES';
export const WAIT_NEW_ORDER_ADD_USER		= '[E-EMMERSE APP] WAIT NEW ORDER ADD USER';
export const NEW_ORDER_GET_STATUS 			= '[E-EMMERSE APP] NEW ORDER GET STATUS ';
export const NEW_ORDER_GET_COMPANIS			= '[E-EMMERSE APP] NEW ORDER GET COMPANIS';
export const NEW_ORDER_GET_PRODUCTS			= '[E-EMMERSE APP] NEW ORDER GET PRODUCTS';
export const NEW_ORDER_ADD_DISCOUNT			= '[E-EMMERSE APP] NEW ORDER ADD DISCOUNT';
export const NEW_ORDER_DELETE_DISCOUNT		= '[E-EMMERSE APP] NEW ORDER DELETE DISCOUNT';
export const NEW_ORDER_GET_DISCOUNTS		= '[E-EMMERSE APP] NEW ORDER GET DISCOUNTS';
export const NEW_ORDER_GET_TAX				= '[E-EMMERSE APP] NEW ORDER GET TAX';
export const NEW_ORDER_ADD_TAX				= '[E-EMMERSE APP] NEW ORDER ADD TAX';
export const NEW_ORDER_DELETE_TAX			= '[E-EMMERSE APP] NEW ORDER DELETE TAX';
export const NEW_ORDER_CREART_ORDER			= '[E-EMMERSE APP] NEW ORDER CREART ORDER';

export function closeAddUserDialog(){
    return {
        type: CLOSE_ADD_ORDER_USER_DIALOG
    }
}

export function openAddUserDialog(){ 
    return {
        type: OPEN_ADD_ORDER_USER_DIALOG
    }
}

export function closeAddProductDialog(){
    return {
        type: CLOSE_ADD_ORDER_PRODUCT_DIALOG
    }
}

export function openAddProductDialog(data){ 
    return {
        type: OPEN_ADD_ORDER_PRODUCT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddDiscountDialog(){
    return {
        type: CLOSE_ADD_ORDER_DISCOUNT_DIALOG
    }
}

export function openAddDiscountDialog(data){ 
    return {
        type: OPEN_ADD_ORDER_DISCOUNT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddTaxDialog(){
    return {
        type: CLOSE_ADD_ORDER_TAX_DIALOG
    }
}

export function openAddTaxDialog(data){ 
    return {
        type: OPEN_ADD_ORDER_TAX_DIALOG,
		data: data ? data : null
    }
}

export function addDiscount(data){
    return {
        type: NEW_ORDER_ADD_DISCOUNT,
		payload: data,
    }
}

export function deleteDiscount(id){
    return {
        type: NEW_ORDER_DELETE_DISCOUNT,
		payload: id,
    }
}

export function addTax(data){
    return {
        type: NEW_ORDER_ADD_TAX,
		payload: data,
    }
}

export function deleteTax(id){
    return {
        type: NEW_ORDER_DELETE_TAX,
		payload: id,
    }
}

export function getData(){
    return (dispatch) => {
		dispatch(getUsers());
		dispatch(getStatusForNewOrder());
		dispatch(getCompanies());
		dispatch(getProductsForNewOrder())
		dispatch(getDiscounts())
		return dispatch(getTax());
	}
}

export function getUsers(){
    const request = axios.get('/api/order-app/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_USERS,
                payload: response.data,
            })
        );
}

export function getAddress(userId){
    const request = axios.get('/api/order-app/addresses', {params:{userId}});
	
    return (dispatch) => {
		dispatch({type:WAIT_NEW_ORDER_ADD_USER, payload:true});
        return request.then((response) => {
			dispatch({type:WAIT_NEW_ORDER_ADD_USER, payload:false});
            return dispatch({
                type   : NEW_ORDER_GET_ADDRESSES,
                payload: response.data,
            })
		});
	}
}

export function getStatusForNewOrder(){
    const request = axios.get('/api/order-app/orders/getOrdersStatus');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_STATUS,
                payload: response.data,
            })
        );
}

export function getCompanies(){
    const request = axios.get('/api/order-app/companies');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_COMPANIS,
                payload: response.data,
            })
        );
}

export function getProductsForNewOrder(){
    const request = axios.get('/api/order-app/products');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_PRODUCTS,
                payload: response.data,
            })
        );
}

export function getDiscounts(){
    const request = axios.get('/api/order-app/discounts');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_DISCOUNTS,
                payload: response.data,
            })
        );
}

export function getTax(){
    const request = axios.get('/api/order-app/tax');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ORDER_GET_TAX,
                payload: response.data,
            })
        );
}

export function createOrder(order){
    const request = axios.post('/api/order-app/create-order', order);
	
    return (dispatch) => request.then((response) => response.data);

}
