// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import {showMessage} from 'app/store/actions/fuse';


export const CLOSE_ADD_ACCDOC_USER_DIALOG	= '[E-ACCOUNT APP] CLOSE ADD ACCDOC USER DIALOG';
export const OPEN_ADD_ACCDOC_USER_DIALOG		= '[E-ACCOUNT APP] OPEN ADD ACCDOC USER DIALOG';
export const CLOSE_ADD_ACCDOC_PRODUCT_DIALOG	= '[E-ACCOUNT APP] CLOSE ADD ACCDOC PRODUCT DIALOG';
export const OPEN_ADD_ACCDOC_PRODUCT_DIALOG	= '[E-ACCOUNT APP] OPEN ADD ACCDOC PRODUCT DIALOG';
export const CLOSE_ADD_ACCDOC_DISCOUNT_DIALOG= '[E-ACCOUNT APP] CLOSE ADD ACCDOC DISCOUNT DIALOG';
export const OPEN_ADD_ACCDOC_DISCOUNT_DIALOG	= '[E-ACCOUNT APP] OPEN ADD ACCDOC DISCOUNT DIALOG';
export const CLOSE_ADD_ACCDOC_TAX_DIALOG		= '[E-ACCOUNT APP] CLOSE ADD ACCDOC TAX DIALOG';
export const OPEN_ADD_ACCDOC_TAX_DIALOG		= '[E-ACCOUNT APP] OPEN ADD ACCDOC TAX DIALOG';
export const NEW_ACCDOC_GET_USERS 			= '[E-ACCOUNT APP] NEW ACCDOC GET USERS';
export const NEW_ACCDOC_GET_ADDRESSES 		= '[E-ACCOUNT APP] NEW ACCDOC GET ADDRESSES';
export const WAIT_NEW_ACCDOC_ADD_USER		= '[E-ACCOUNT APP] WAIT NEW ACCDOC ADD USER';
export const NEW_ACCDOC_GET_STATUS 			= '[E-ACCOUNT APP] NEW ACCDOC GET STATUS ';
export const NEW_ACCDOC_GET_COMPANIS			= '[E-ACCOUNT APP] NEW ACCDOC GET COMPANIS';
export const NEW_ACCDOC_GET_PRODUCTS			= '[E-ACCOUNT APP] NEW ACCDOC GET PRODUCTS';
export const NEW_ACCDOC_ADD_DISCOUNT			= '[E-ACCOUNT APP] NEW ACCDOC ADD DISCOUNT';
export const NEW_ACCDOC_DELETE_DISCOUNT		= '[E-ACCOUNT APP] NEW ACCDOC DELETE DISCOUNT';
export const NEW_ACCDOC_GET_DISCOUNTS		= '[E-ACCOUNT APP] NEW ACCDOC GET DISCOUNTS';
export const NEW_ACCDOC_GET_TAX				= '[E-ACCOUNT APP] NEW ACCDOC GET TAX';
export const NEW_ACCDOC_ADD_TAX				= '[E-ACCOUNT APP] NEW ACCDOC ADD TAX';
export const NEW_ACCDOC_DELETE_TAX			= '[E-ACCOUNT APP] NEW ACCDOC DELETE TAX';
export const NEW_ACCDOC_CREART_ACCDOC			= '[E-ACCOUNT APP] NEW ACCDOC CREART ACCDOC';

export function closeAddUserDialog(){
    return {
        type: CLOSE_ADD_ACCDOC_USER_DIALOG
    }
}

export function openAddUserDialog(){ 
    return {
        type: OPEN_ADD_ACCDOC_USER_DIALOG
    }
}

export function closeAddProductDialog(){
    return {
        type: CLOSE_ADD_ACCDOC_PRODUCT_DIALOG
    }
}

export function openAddProductDialog(data){ 
    return {
        type: OPEN_ADD_ACCDOC_PRODUCT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddDiscountDialog(){
    return {
        type: CLOSE_ADD_ACCDOC_DISCOUNT_DIALOG
    }
}

export function openAddDiscountDialog(data){ 
    return {
        type: OPEN_ADD_ACCDOC_DISCOUNT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddTaxDialog(){
    return {
        type: CLOSE_ADD_ACCDOC_TAX_DIALOG
    }
}

export function openAddTaxDialog(data){ 
    return {
        type: OPEN_ADD_ACCDOC_TAX_DIALOG,
		data: data ? data : null
    }
}

export function addDiscount(data){
    return {
        type: NEW_ACCDOC_ADD_DISCOUNT,
		payload: data,
    }
}

export function deleteDiscount(id){
    return {
        type: NEW_ACCDOC_DELETE_DISCOUNT,
		payload: id,
    }
}

export function addTax(data){
    return {
        type: NEW_ACCDOC_ADD_TAX,
		payload: data,
    }
}

export function deleteTax(id){
    return {
        type: NEW_ACCDOC_DELETE_TAX,
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
    const request = axios.get('/api/accdoc-app/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_USERS,
                payload: response.data,
            })
        );
}

export function getAddress(userId){
    const request = axios.get('/api/accdoc-app/addresses', {params:{userId}});
	
    return (dispatch) => {
		dispatch({type:WAIT_NEW_ACCDOC_ADD_USER, payload:true});
        return request.then((response) => {
			dispatch({type:WAIT_NEW_ACCDOC_ADD_USER, payload:false});
            return dispatch({
                type   : NEW_ACCDOC_GET_ADDRESSES,
                payload: response.data,
            })
		});
	}
}

export function getStatusForNewOrder(){
    const request = axios.get('/api/accdoc-app/accdocs/getAccdocsStatus');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_STATUS,
                payload: response.data,
            })
        );
}

export function getCompanies(){
    const request = axios.get('/api/accdoc-app/companies');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_COMPANIS,
                payload: response.data,
            })
        );
}

export function getProductsForNewOrder(){
    const request = axios.get('/api/accdoc-app/products');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_PRODUCTS,
                payload: response.data,
            })
        );
}

export function getDiscounts(){
    const request = axios.get('/api/accdoc-app/discounts');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_DISCOUNTS,
                payload: response.data,
            })
        );
}

export function getTax(){
    const request = axios.get('/api/accdoc-app/tax');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_ACCDOC_GET_TAX,
                payload: response.data,
            })
        );
}

export function createOrder(order){
    const request = axios.post('/api/accdoc-app/create-order', order);
	
    return (dispatch) => request.then((response) => response.data);

}
