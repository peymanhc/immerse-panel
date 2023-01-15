import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_ORDERSSTATUS = '[E-EMMERSE APP] GET ORDERSSTATUS';
export const UPDATE_ORDERSSTATUS  = '[E-EMMERSE APP] UPDATE ORDERSSTATUS';
export const OPEN_NEW_ORDERSSTATUS_DIALOG = '[E-EMMERSE APP] OPEN NEW ORDERSSTATUS DIALOG';
export const CLOSE_NEW_ORDERSSTATUS_DIALOG = '[E-EMMERSE APP] CLOSE NEW ORDERSSTATUS DIALOG';
export const OPEN_EDIT_ORDERSSTATUS_DIALOG = '[E-EMMERSE APP] OPEN EDIT ORDERSSTATUS DIALOG';
export const CLOSE_EDIT_ORDERSSTATUS_DIALOG = '[E-EMMERSE APP] CLOSE EDIT ORDERSSTATUS DIALOG';
export const SET_ORDERSSTATUS_SEARCH_TEXT = '[E-EMMERSE APP] SET ORDERSSTATUS SEARCH TEXT';
export const TOGGLE_ORDERSSTATUS_ORDER_DESCENDING = '[E-EMMERSE APP] TOGGLE ORDERSSTATUS ORDER DESCENDING';
export const CHANGE_ORDERSSTATUS_ORDER = '[E-EMMERSE APP] CHANGE ORDERSSTATUS ORDER';
export const TOGGLE_STARRED = '[E-EMMERSE APP] TOGGLE ORDERSSTATUS STARRED';
export const TOGGLE_IMPORTANT = '[E-EMMERSE APP] TOGGLE ORDERSSTATUS IMPORTANT';
export const TOGGLE_ENABLE = '[E-EMMERSE APP] TOGGLE ORDERSSTATUS ENABLE';
export const TOGGLE_DISABLE = '[E-EMMERSE APP] TOGGLE ORDERSSTATUS DISABLE';
export const ADD_ORDERSSTATUS = '[E-EMMERSE APP] ADD ORDERSSTATUS';
export const REMOVE_ORDERSSTATUS = '[E-EMMERSE APP] REMOVE ORDERSSTATUS';
export const WAIT_ORDERSSTATUS = '[E-EMMERSE APP] ADD LOADING ORDERSSTATUS';
export const GET_TYPES = '[E-EMMERSE APP] GET TYPES';


export function getOrdersStatus1()
{
    const request = axios.get('/api/order-app/orders/getOrdersStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDERSSTATUS,
                payload: response.data
            })
        );
}

 
 
export function setOrdersStatusSearchText(event)
{
    return {
        type      : SET_ORDERSSTATUS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeOrdersStatusOrder(orderBy)
{
    return {
        type: CHANGE_ORDERSSTATUS_ORDER,
        orderBy
    }
}

export function toggleOrdersStatusOrderDescending()
{
    return {
        type: TOGGLE_ORDERSSTATUS_ORDER_DESCENDING
    }
}

export function toggleOrdersStatusStarred(ordersStatus)
{
    const newOrdersStatus = {
        ...ordersStatus,
        starred: !ordersStatus.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateOrdersStatus(newOrdersStatus)))
    )
}

export function toggleOrdersStatusImportant(ordersStatus)
{
    const newOrdersStatus = {
        ...ordersStatus,
        important: !ordersStatus.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateOrdersStatus(newOrdersStatus)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "order_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/order-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/order-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};
export function updateOrdersStatus(ordersStatus)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_ORDERSSTATUS, payload: true});
		const {imgSrc} = ordersStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "orderS", "put"); 
				ordersStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				ordersStatus["imgSrc"] = "";
			}
		}	
		const request = axios.put('/api/order-app/update-ordersStatus', ordersStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_ORDERSSTATUS_DIALOG});
			dispatch({type: WAIT_ORDERSSTATUS, payload: false});
			return dispatch(getOrdersStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_ORDERSSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditOrdersStatusDialog()
{
    return {
        type: CLOSE_EDIT_ORDERSSTATUS_DIALOG
    }
}

export function closeNewOrdersStatusDialog()
{
    return {
        type: CLOSE_NEW_ORDERSSTATUS_DIALOG
    }
}

export function openEditOrdersStatusDialog(data)
{ 
    return {
        type: OPEN_EDIT_ORDERSSTATUS_DIALOG,
        data
    }
}

export function openNewOrdersStatusDialog()
{
    return {
        type: OPEN_NEW_ORDERSSTATUS_DIALOG
    }
}

export function addOrdersStatus(ordersStatus)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_ORDERSSTATUS, payload: true});
		const {imgSrc} = ordersStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "orderS", "post"); 
				ordersStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				ordersStatus["imgSrc"] = "";
			}
		}	
		const request = axios.post('/api/order-app/new-status', ordersStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_ORDERSSTATUS_DIALOG});
			dispatch({type: WAIT_ORDERSSTATUS, payload: false});
			return dispatch(getOrdersStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_ORDERSSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeOrdersStatus(ordersStatusId)
{
    const request = axios.delete('/api/order-app/remove-ordersStatus', {data: {statusId:ordersStatusId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_ORDERSSTATUS
                    })
                ]).then(() => dispatch(getOrdersStatus1()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}