import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_ORDER = '[E-EMMERSE APP] GET ORDER';
export const SAVE_ORDER = '[E-EMMERSE APP] SAVE ORDER';
export const CLOSE_ADD_ORDER_STATUS_DIALOG = '[E-EMMERSE APP] CLOSE ADD ORDER STATUS DIALOG';
export const OPEN_ADD_ORDER_STATUS_DIALOG = '[E-EMMERSE APP] OPEN ADD ORDER STATUS DIALOG';
export const CLOSE_ADD_ORDER_PRICE_DIALOG = '[E-EMMERSE APP] CLOSE ADD ORDER PRICE DIALOG';
export const OPEN_ADD_ORDER_PRICE_DIALOG = '[E-EMMERSE APP] OPEN ADD ORDER PRICE DIALOG';
export const CLOSE_ORDER_SHOW_IMAGE_DIALOG = '[E-EMMERSE APP] CLOSE ORDER SHOW IMAGE DIALOG';
export const OPEN_ORDER_SHOW_IMAGE_DIALOG = '[E-EMMERSE APP] OPEN ORDER SHOW IMAGE DIALOG';
export const GET_ORDER_STATUS = '[E-EMMERSE APP] GET ORDER STATUS';
export const WAIT_ORDER_STATUS = '[E-EMMERSE APP] WAIT_ORDER_STATUS';


export function getOrder(params)
{
    const request = axios.get('/api/order-app/order', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDER,
                payload: response.data
            })
        );
}

export function getOrderStatus() {
    const request = axios.get('/api/order-app/orders/getOrdersStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ORDER_STATUS,
                payload: response.data
            })
        );
}

export function saveOrder(data)
{
    const request = axios.put('/api/order-app/order/save', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Order Saved'}));

                return dispatch({
                    type   : SAVE_ORDER,
                    payload: response.data
                })
            }
        );
}

export function closeAddStatusDialog()
{
    return {
        type: CLOSE_ADD_ORDER_STATUS_DIALOG
    }
}

export function openAddStatusDialog()
{ 
    return {
        type: OPEN_ADD_ORDER_STATUS_DIALOG
    }
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/order-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/order-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};

export function addOrderToStatus(orderId, statusId, image1, image2, description)
{
    
	let images = [];
	if(image1)
		images.push(image1);
	if(image2)
		images.push(image2);
	
	const status = {
		orderId, 
		statusId,
		description,
	};

	
    return (dispatch) => {
		dispatch({type: WAIT_ORDER_STATUS, payload: true});
		return saveImage(images, "post").then((images) => { 
			if(images)
				images.forEach(({url, id}) => {
					if(id === "imgSrc1")
						status.imgSrc1 = url;
					else if(id === "imgSrc2")
						status.imgSrc2= url;
				});	
			const request = axios.post('/api/order-app/order/add-status', status);	
			return request.then((response) => {
					dispatch({type: WAIT_ORDER_STATUS, payload: false});
					dispatch(closeAddStatusDialog());
					dispatch(showMessage({message: 'Order Saved'}));
					return dispatch({
						type   : SAVE_ORDER,
						payload: response.data
					})
				}
			).catch(err => {
				dispatch({type: WAIT_ORDER_STATUS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}));
				return dispatch(closeAddStatusDialog());
			});				
		}).catch(err => {
			dispatch({type: WAIT_ORDER_STATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	}

}

export function removeOrderToStatus(orderId, Ids) {
    const request = axios.delete('/api/order-app/order/remove-status', {data: {orderId, Ids}});

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Order Saved'}));
                return dispatch({
                    type   : SAVE_ORDER,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}

export function sendMessage(message, orderId) { 
    const request = axios.post('/api/order-app/order/send-message', {message, orderId});

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : SAVE_ORDER,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}


export function closeAddPriceDialog()
{
    return {
        type: CLOSE_ADD_ORDER_PRICE_DIALOG
    }
}

export function openAddPriceDialog()
{ 
    return {
        type: OPEN_ADD_ORDER_PRICE_DIALOG
    }
}


export function closeOrderShowImageDialog()
{
    return {
        type: CLOSE_ORDER_SHOW_IMAGE_DIALOG
    }
}

export function openOrderShowImageDialog()
{ 
    return {
        type: OPEN_ORDER_SHOW_IMAGE_DIALOG
    }
}