import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_WARRANTYLIST = '[E-EMMERSE APP] GET WARRANTYLIST';
export const SET_WARRANTYLIST_SEARCH_TEXT = '[E-EMMERSE APP] SET WARRANTYLIST SEARCH TEXT';
export const SET_WARRANTYLIST_STATUS_RADIO = '[E-EMMERSE APP] SET WARRANTYLIST STATUS RADIO';
export const OPEN_WARRANTYLIST_DIALOG = '[E-EMMERSE APP] OPEN WARRANTYLIST DIALOG';
export const CLOSE_WARRANTYLIST_DIALOG = '[E-EMMERSE APP] CLOSE WARRANTYLIST DIALOG';
export const GET_MASTERS = '[E-EMMERSE APP] GET MASTERS';
export const GET_WARRANTYLIST_STATUS = '[E-EMMERSE APP] GET WARRANTYLIST STATUS';

export function getWarrantylist(perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/warranty-app/warrantylist', {
        params: {
			limit: perPage,
			skip: skip
		}		
	});
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTYLIST,
                payload: response.data.warrantylist,
				count: response.data.count
            })
        );
}

export function removeWarrantylist(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/warranty-app/warrantylist/remove', { data: {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getWarrantylist(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setWarrantylistSearchText(event)
{
    return {
        type      : SET_WARRANTYLIST_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setWarrantylistStatusRadio(value)
{
    return {
        type      	: SET_WARRANTYLIST_STATUS_RADIO,
        statusRadio	: value
    }
}

export function openWarrantylistMapDialog(data)
{
    return {
        type: OPEN_WARRANTYLIST_DIALOG,
        data
    }
}

export function closeWarrantylistMapDialog()
{
    return {
        type: CLOSE_WARRANTYLIST_DIALOG
    }
}

export function getMasters()
{
    const request = axios.get('/api/warranty-app/masters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTERS,
                payload: response.data
            })
        );
}

export function getWarrantylistStatus() {
    const request = axios.get('/api/warranty-app/warrantylist/getWarrantylistStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTYLIST_STATUS,
                payload: response.data
            })
        );
}

export function saveMasterWarranty(ids, statusId, masterId) {
    const request = axios.post('/api/warranty-app/save-master-warranty', {
		ids, statusId, masterId,
	});

    return (dispatch) =>
        request.then((response) => {
			dispatch(getWarrantylist());	
			dispatch(closeWarrantylistMapDialog());            
			return dispatch(showMessage({message: 'Data Save'}));
		}).catch((err) => {
			console.log(err);
			return dispatch(showMessage({message: 'Access Denied'}))
		});
}
