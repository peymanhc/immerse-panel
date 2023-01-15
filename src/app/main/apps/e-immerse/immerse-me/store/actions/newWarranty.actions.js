// eslint-disable-next-line
import axios from 'axios';
// eslint-disable-next-line
import {showMessage} from 'app/store/actions/fuse';


export const CLOSE_ADD_WARRANTY_USER_DIALOG	= '[E-EMMERSE APP] CLOSE ADD WARRANTY USER DIALOG';
export const OPEN_ADD_WARRANTY_USER_DIALOG		= '[E-EMMERSE APP] OPEN ADD WARRANTY USER DIALOG';
export const CLOSE_ADD_WARRANTY_PRODUCT_DIALOG	= '[E-EMMERSE APP] CLOSE ADD WARRANTY PRODUCT DIALOG';
export const OPEN_ADD_WARRANTY_PRODUCT_DIALOG	= '[E-EMMERSE APP] OPEN ADD WARRANTY PRODUCT DIALOG';
export const CLOSE_ADD_WARRANTY_DISCOUNT_DIALOG= '[E-EMMERSE APP] CLOSE ADD WARRANTY DISCOUNT DIALOG';
export const OPEN_ADD_WARRANTY_DISCOUNT_DIALOG	= '[E-EMMERSE APP] OPEN ADD WARRANTY DISCOUNT DIALOG';
export const CLOSE_ADD_WARRANTY_TAX_DIALOG		= '[E-EMMERSE APP] CLOSE ADD WARRANTY TAX DIALOG';
export const OPEN_ADD_WARRANTY_TAX_DIALOG		= '[E-EMMERSE APP] OPEN ADD WARRANTY TAX DIALOG';
export const NEW_WARRANTY_GET_USERS 			= '[E-EMMERSE APP] NEW WARRANTY GET USERS';
export const NEW_WARRANTY_GET_ADDRESSES 		= '[E-EMMERSE APP] NEW WARRANTY GET ADDRESSES';
export const WAIT_NEW_WARRANTY_ADD_USER		= '[E-EMMERSE APP] WAIT NEW WARRANTY ADD USER';
export const NEW_WARRANTY_GET_STATUS 			= '[E-EMMERSE APP] NEW WARRANTY GET STATUS ';
export const NEW_WARRANTY_GET_COMPANIS			= '[E-EMMERSE APP] NEW WARRANTY GET COMPANIS';
export const NEW_WARRANTY_GET_PRODUCTS			= '[E-EMMERSE APP] NEW WARRANTY GET PRODUCTS';
export const NEW_WARRANTY_ADD_DISCOUNT			= '[E-EMMERSE APP] NEW WARRANTY ADD DISCOUNT';
export const NEW_WARRANTY_DELETE_DISCOUNT		= '[E-EMMERSE APP] NEW WARRANTY DELETE DISCOUNT';
export const NEW_WARRANTY_GET_DISCOUNTS		= '[E-EMMERSE APP] NEW WARRANTY GET DISCOUNTS';
export const NEW_WARRANTY_GET_TAX				= '[E-EMMERSE APP] NEW WARRANTY GET TAX';
export const NEW_WARRANTY_ADD_TAX				= '[E-EMMERSE APP] NEW WARRANTY ADD TAX';
export const NEW_WARRANTY_DELETE_TAX			= '[E-EMMERSE APP] NEW WARRANTY DELETE TAX';
export const NEW_WARRANTY_CREART_WARRANTY			= '[E-EMMERSE APP] NEW WARRANTY CREART WARRANTY';

export function closeAddUserDialog(){
    return {
        type: CLOSE_ADD_WARRANTY_USER_DIALOG
    }
}

export function openAddUserDialog(){ 
    return {
        type: OPEN_ADD_WARRANTY_USER_DIALOG
    }
}

export function closeAddProductDialog(){
    return {
        type: CLOSE_ADD_WARRANTY_PRODUCT_DIALOG
    }
}

export function openAddProductDialog(data){ 
    return {
        type: OPEN_ADD_WARRANTY_PRODUCT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddDiscountDialog(){
    return {
        type: CLOSE_ADD_WARRANTY_DISCOUNT_DIALOG
    }
}

export function openAddDiscountDialog(data){ 
    return {
        type: OPEN_ADD_WARRANTY_DISCOUNT_DIALOG,
		data: data ? data : null
    }
}

export function closeAddTaxDialog(){
    return {
        type: CLOSE_ADD_WARRANTY_TAX_DIALOG
    }
}

export function openAddTaxDialog(data){ 
    return {
        type: OPEN_ADD_WARRANTY_TAX_DIALOG,
		data: data ? data : null
    }
}

export function addDiscount(data){
    return {
        type: NEW_WARRANTY_ADD_DISCOUNT,
		payload: data,
    }
}

export function deleteDiscount(id){
    return {
        type: NEW_WARRANTY_DELETE_DISCOUNT,
		payload: id,
    }
}

export function addTax(data){
    return {
        type: NEW_WARRANTY_ADD_TAX,
		payload: data,
    }
}

export function deleteTax(id){
    return {
        type: NEW_WARRANTY_DELETE_TAX,
		payload: id,
    }
}

export function getData(){
    return (dispatch) => {
		dispatch(getUsers());
		dispatch(getStatusForNewWarranty());
		dispatch(getCompanies());
		dispatch(getProductsForNewWarranty())
		dispatch(getDiscounts())
		return dispatch(getTax());
	}
}

export function getUsers(){
    const request = axios.get('/api/warranty-app/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_USERS,
                payload: response.data,
            })
        );
}

export function getAddress(userId){
    const request = axios.get('/api/warranty-app/addresses', {params:{userId}});
	
    return (dispatch) => {
		dispatch({type:WAIT_NEW_WARRANTY_ADD_USER, payload:true});
        return request.then((response) => {
			dispatch({type:WAIT_NEW_WARRANTY_ADD_USER, payload:false});
            return dispatch({
                type   : NEW_WARRANTY_GET_ADDRESSES,
                payload: response.data,
            })
		});
	}
}

export function getStatusForNewWarranty(){
    const request = axios.get('/api/warranty-app/warrantylist/getWarrantylistStatus');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_STATUS,
                payload: response.data,
            })
        );
}

export function getCompanies(){
    const request = axios.get('/api/warranty-app/companies');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_COMPANIS,
                payload: response.data,
            })
        );
}

export function getProductsForNewWarranty(){
    const request = axios.get('/api/warranty-app/products');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_PRODUCTS,
                payload: response.data,
            })
        );
}

export function getDiscounts(){
    const request = axios.get('/api/warranty-app/discounts');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_DISCOUNTS,
                payload: response.data,
            })
        );
}

export function getTax(){
    const request = axios.get('/api/warranty-app/tax');
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : NEW_WARRANTY_GET_TAX,
                payload: response.data,
            })
        );
}

export function createWarranty(warranty){
    const request = axios.post('/api/warranty-app/create-warranty', warranty);
	
    return (dispatch) => request.then((response) => response.data);

}
