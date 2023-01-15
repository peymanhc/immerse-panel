import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_ACCDOC = '[E-ACCOUNT APP] GET ACCDOC';
export const SAVE_ACCDOC = '[E-ACCOUNT APP] SAVE ACCDOC';
export const CLOSE_ADD_ACCDOC_STATUS_DIALOG = '[E-ACCOUNT APP] CLOSE ADD ACCDOC STATUS DIALOG';
export const OPEN_ADD_ACCDOC_STATUS_DIALOG = '[E-ACCOUNT APP] OPEN ADD ACCDOC STATUS DIALOG';
export const CLOSE_ADD_ACCDOC_PRICE_DIALOG = '[E-ACCOUNT APP] CLOSE ADD ACCDOC PRICE DIALOG';
export const OPEN_ADD_ACCDOC_PRICE_DIALOG = '[E-ACCOUNT APP] OPEN ADD ACCDOC PRICE DIALOG';
export const CLOSE_ACCDOC_SHOW_IMAGE_DIALOG = '[E-ACCOUNT APP] CLOSE ACCDOC SHOW IMAGE DIALOG';
export const OPEN_ACCDOC_SHOW_IMAGE_DIALOG = '[E-ACCOUNT APP] OPEN ACCDOC SHOW IMAGE DIALOG';
export const GET_ACCDOC_STATUS = '[E-ACCOUNT APP] GET ACCDOC STATUS';
export const WAIT_ACCDOC_STATUS = '[E-ACCOUNT APP] WAIT_ACCDOC_STATUS';


export function getAccdoc(params)
{
    const request = axios.get('/api/accdoc-app/accdoc', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ACCDOC,
                payload: response.data
            })
        );
}

export function getAccdocStatus() {
    const request = axios.get('/api/accdoc-app/accdocs/getAccdocsStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ACCDOC_STATUS,
                payload: response.data
            })
        );
}

export function saveOrder(data)
{
    const request = axios.put('/api/accdoc-app/accdoc/save', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Order Saved'}));

                return dispatch({
                    type   : SAVE_ACCDOC,
                    payload: response.data
                })
            }
        );
}

export function closeAddStatusDialog()
{
    return {
        type: CLOSE_ADD_ACCDOC_STATUS_DIALOG
    }
}

export function openAddStatusDialog()
{ 
    return {
        type: OPEN_ADD_ACCDOC_STATUS_DIALOG
    }
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/accdoc-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/accdoc-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};

export function addAccdocToStatus(accdocId, statusId, image1, image2, description)
{
    
	let images = [];
	if(image1)
		images.push(image1);
	if(image2)
		images.push(image2);
	
	const status = {
		accdocId, 
		statusId,
		description,
	};

	
    return (dispatch) => {
		dispatch({type: WAIT_ACCDOC_STATUS, payload: true});
		return saveImage(images, "post").then((images) => { 
			if(images)
				images.forEach(({url, id}) => {
					if(id === "imgSrc1")
						status.imgSrc1 = url;
					else if(id === "imgSrc2")
						status.imgSrc2= url;
				});	
			const request = axios.post('/api/accdoc-app/accdoc/add-status', status);	
			return request.then((response) => {
					dispatch({type: WAIT_ACCDOC_STATUS, payload: false});
					dispatch(closeAddStatusDialog());
					dispatch(showMessage({message: 'Order Saved'}));
					return dispatch({
						type   : SAVE_ACCDOC,
						payload: response.data
					})
				}
			).catch(err => {
				dispatch({type: WAIT_ACCDOC_STATUS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}));
				return dispatch(closeAddStatusDialog());
			});				
		}).catch(err => {
			dispatch({type: WAIT_ACCDOC_STATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	}

}

export function removeOrderToStatus(accdocId, Ids) {
    const request = axios.delete('/api/accdoc-app/accdoc/remove-status', {data: {accdocId, Ids}});

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Order Saved'}));
                return dispatch({
                    type   : SAVE_ACCDOC,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}

export function sendMessage(message, accdocId) { 
    const request = axios.post('/api/accdoc-app/accdoc/send-message', {message, accdocId});

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : SAVE_ACCDOC,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}


export function closeAddPriceDialog()
{
    return {
        type: CLOSE_ADD_ACCDOC_PRICE_DIALOG
    }
}

export function openAddPriceDialog()
{ 
    return {
        type: OPEN_ADD_ACCDOC_PRICE_DIALOG
    }
}


export function closeAccdocShowImageDialog()
{
    return {
        type: CLOSE_ACCDOC_SHOW_IMAGE_DIALOG
    }
}

export function openAccdocShowImageDialog()
{ 
    return {
        type: OPEN_ACCDOC_SHOW_IMAGE_DIALOG
    }
}