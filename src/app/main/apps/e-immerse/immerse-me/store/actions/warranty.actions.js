import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_WARRANTY = '[E-EMMERSE APP] GET WARRANTY';
export const SAVE_WARRANTY = '[E-EMMERSE APP] SAVE WARRANTY';
export const CLOSE_ADD_WARRANTY_STATUS_DIALOG = '[E-EMMERSE APP] CLOSE ADD WARRANTY STATUS DIALOG';
export const OPEN_ADD_WARRANTY_STATUS_DIALOG = '[E-EMMERSE APP] OPEN ADD WARRANTY STATUS DIALOG';
export const CLOSE_ADD_WARRANTY_PRICE_DIALOG = '[E-EMMERSE APP] CLOSE ADD WARRANTY PRICE DIALOG';
export const OPEN_ADD_WARRANTY_PRICE_DIALOG = '[E-EMMERSE APP] OPEN ADD WARRANTY PRICE DIALOG';
export const CLOSE_WARRANTY_SHOW_IMAGE_DIALOG = '[E-EMMERSE APP] CLOSE WARRANTY SHOW IMAGE DIALOG';
export const OPEN_WARRANTY_SHOW_IMAGE_DIALOG = '[E-EMMERSE APP] OPEN WARRANTY SHOW IMAGE DIALOG';
export const GET_WARRANTY_STATUS = '[E-EMMERSE APP] GET WARRANTY STATUS';
export const WAIT_WARRANTY_STATUS = '[E-EMMERSE APP] WAIT_WARRANTY_STATUS';

export function getWarranty(params)
{
    const request = axios.get('/api/warranty-app/warranty', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTY,
                payload: response.data
            })
        );
}

export function getWarrantyStatus() {
    const request = axios.get('/api/warranty-app/warrantylist/getWarrantylistStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTY_STATUS,
                payload: response.data
            })
        );
}

export function saveWarranty(data)
{
    const request = axios.put('/api/warranty-app/warranty/save', data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Warranty Saved'}));

                return dispatch({
                    type   : SAVE_WARRANTY,
                    payload: response.data
                })
            }
        );
}

export function closeAddStatusDialog()
{
    return {
        type: CLOSE_ADD_WARRANTY_STATUS_DIALOG
    }
}

export function openAddStatusDialog()
{ 
    return {
        type: OPEN_ADD_WARRANTY_STATUS_DIALOG
    }
}
const uploadImage = (file, id, type) => {   
    return new Promise((resolve, reject) => {
        var formData = new FormData();  
        var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
        formData.append(fileName, file);
        if(type === "post")
            axios.post('/api/warranty-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
        else
            axios.put('/api/warranty-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));               
    });
};

const saveImage = (files, type) => {
    const promises = [];
    files.forEach(({file, id}) => {
        promises.push(uploadImage(file, id, type));
    });
    return Promise.all(promises);
};

export function addWarrantyToStatus(warrantyId, statusId, image1, image2, description)
{
    
    let images = [];
    if(image1)
        images.push(image1);
    if(image2)
        images.push(image2);
    
    const status = {
        warrantyId, 
        statusId,
        description,
    };

    
    return (dispatch) => {
        dispatch({type: WAIT_WARRANTY_STATUS, payload: true});
        return saveImage(images, "post").then((images) => { 
            if(images)
                images.forEach(({url, id}) => {
                    if(id === "imgSrc1")
                        status.imgSrc1 = url;
                    else if(id === "imgSrc2")
                        status.imgSrc2= url;
                }); 
            const request = axios.post('/api/warranty-app/warranty/add-status', status);  
            return request.then((response) => {
                    dispatch({type: WAIT_WARRANTY_STATUS, payload: false});
                    dispatch(closeAddStatusDialog());
                    dispatch(showMessage({message: 'Warranty Saved'}));
                    return dispatch({
                        type   : SAVE_WARRANTY,
                        payload: response.data
                    })
                }
            ).catch(err => {
                dispatch({type: WAIT_WARRANTY_STATUS, payload: false});
                dispatch(showMessage({message: 'Access Denied'}));
                return dispatch(closeAddStatusDialog());
            });             
        }).catch(err => {
            dispatch({type: WAIT_WARRANTY_STATUS, payload: false});
            dispatch(showMessage({message: 'Access Denied'}));
                                           
        });         
    }

}

export function removeWarrantyToStatus(warrantyId, Ids) {
    const request = axios.delete('/api/warranty-app/warranty/remove-status', {data: {warrantyId, Ids}});

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Warranty Saved'}));
                return dispatch({
                    type   : SAVE_WARRANTY,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}

export function sendMessage(message, warrantyId) { 
    const request = axios.post('/api/warranty-app/warranty/send-message', {message, warrantyId});

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type   : SAVE_WARRANTY,
                    payload: response.data
                })
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}


export function closeAddPriceDialog()
{
    return {
        type: CLOSE_ADD_WARRANTY_PRICE_DIALOG
    }
}

export function openAddPriceDialog()
{ 
    return {
        type: OPEN_ADD_WARRANTY_PRICE_DIALOG
    }
}


export function closeWarrantyShowImageDialog()
{
    return {
        type: CLOSE_WARRANTY_SHOW_IMAGE_DIALOG
    }
}

export function openWarrantyShowImageDialog()
{ 
    return {
        type: OPEN_WARRANTY_SHOW_IMAGE_DIALOG
    }
}