import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_ORDERS = '[E-COMMERCE APP] GET ORDERS';
export const SET_ORDERS_SEARCH_TEXT = '[E-COMMERCE APP] SET ORDERS SEARCH TEXT';
export const SET_ORDERS_STATUS_RADIO = '[E-COMMERCE APP] SET ORDERS STATUS RADIO';
export const OPEN_ORDERS_DIALOG = '[E-COMMERCE APP] OPEN ORDERS DIALOG';
export const CLOSE_ORDERS_DIALOG = '[E-COMMERCE APP] CLOSE ORDERS DIALOG';
export const GET_MASTERS = '[E-COMMERCE APP] GET MASTERS';
export const GET_ORDERS_STATUS = '[E-COMMERCE APP] GET ORDERS STATUS';

export function getOrders(perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/order-app/orders', {
        params: {
			limit: perPage,
			skip: skip
		}		
	});
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERS,
                payload: response.data.orders,
				count: response.data.count
            })
        );
}

export function removeOrders(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/order-app/orders/remove', { data: {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getOrders(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setOrdersStatusRadio(value)
{
    return {
        type      	: SET_ORDERS_STATUS_RADIO,
        statusRadio	: value
    }
}

export function openOrdersMapDialog(data)
{
    return {
        type: OPEN_ORDERS_DIALOG,
        data
    }
}

export function closeOrdersMapDialog()
{
    return {
        type: CLOSE_ORDERS_DIALOG
    }
}

export function getMasters()
{
    const request = axios.get('/api/order-app/masters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTERS,
                payload: response.data
            })
        );
}

export function getOrdersStatus() {
    const request = axios.get('/api/order-app/orders/getOrdersStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERS_STATUS,
                payload: response.data
            })
        );
}

export function saveMasterOrder(ids, statusId, masterId) {
    const request = axios.post('/api/order-app/save-master-order', {
		ids, statusId, masterId,
	});

    return (dispatch) =>
        request.then((response) => {
			dispatch(getOrders());	
			dispatch(closeOrdersMapDialog());            
			return dispatch(showMessage({message: 'Data Save'}));
		}).catch((err) => {
			console.log(err);
			return dispatch(showMessage({message: 'Access Denied'}))
		});
}
