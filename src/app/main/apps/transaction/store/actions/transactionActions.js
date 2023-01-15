import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_USERS 		  = '[TRANSACTION APP] GET USERS';
export const GET_GATEWAYS	  = '[TRANSACTION APP] GET GATEWAYS';
export const GET_CREDIT		  = '[TRANSACTION APP] GET CREDIT';
export const GET_PAYMENT_URL  = '[TRANSACTION APP] GET PAYMENT URL';

 
export function getUsers() {
    const request = axios.get('/api/transaction-app/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USERS,
                payload: response.data,              
            })
        );
}



export function getGateways() {
    const request = axios.get('/api/transaction-app/gateways');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_GATEWAYS,
                payload: response.data,              
            })
        );
}

export function addTransaction(amount, description, gatewayId, userId) {
    const request = axios.post('/api/transaction-app/addTransaction', {amount, description, gatewayId, userId });

    return (dispatch) =>
        request.then((response) =>{
			dispatch(showMessage({message: 'Credit Updated', variant:'success'}));
			return dispatch(getCredit());
		}).catch(() => dispatch(showMessage({message: 'Access Denied'})));
}

export function getCredit() {
    const request = axios.get('/api/transaction-app/getCredit');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CREDIT,
                payload: response.data.amount,              
            })
        );
}

export function createPaymentLink(amount, description, gatewayId, userId) {
    const request = axios.post('/api/transaction-app/createPaymentLink', {amount, description, gatewayId, userId });

    return (dispatch) =>
        request.then((response) =>{
			if(response.data.error){
				if(response.data.error === 0)
					dispatch(showMessage({message: 'Server has a problem'}));
				else if(response.data.error === 1)
					dispatch(showMessage({message: 'Gateway Error'}));
				else if(response.data.error === 2)
					dispatch(showMessage({message: 'Input Error'}));					
				return dispatch({
					type   : GET_PAYMENT_URL,
					payload: null,              
				})				
			}
            return dispatch({
                type   : GET_PAYMENT_URL,
                payload: response.data.url,              
            })
		}).catch(() => dispatch(showMessage({message: 'Access Denied'})));
}

export function removeUrl() {
    return {
			type   : GET_PAYMENT_URL,
			payload: null,              
	}
}

export function verification(authority) {
    const request = axios.post('/api/transaction-app/verification', {authority });

    return (dispatch) =>
        request.then((response) =>{
			if(response.data.error){
				if(response.data.error === 0)
					return dispatch(showMessage({message: 'Server has a problem', variant:'error'}));
				else if(response.data.error === 1)
					return dispatch(showMessage({message: 'Transaction not found', variant:'error'}));
				else if(response.data.error === 2)
					return dispatch(showMessage({message: 'Payment faild', variant:'error'}));									
			}
			dispatch(showMessage({message: 'Payment successful', variant:'success'}));
            return dispatch(getCredit());
		}).catch(() => dispatch(showMessage({message: 'Access Denied'})));
}

export function paymentFaild() {
    return (dispatch) =>{
        dispatch(showMessage({message: 'Payment faild', variant:'error'}));
		return Promise.resolve();
	}
}