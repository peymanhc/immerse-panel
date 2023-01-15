import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_ACCDOCS = '[E-ACCOUNT APP] GET ACCDOCS';
export const SET_ACCDOCS_SEARCH_TEXT = '[E-ACCOUNT APP] SET ACCDOCS SEARCH TEXT';
export const SET_ACCDOCS_STATUS_RADIO = '[E-ACCOUNT APP] SET ACCDOCS STATUS RADIO';
export const OPEN_ACCDOCS_DIALOG = '[E-ACCOUNT APP] OPEN ACCDOCS DIALOG';
export const CLOSE_ACCDOCS_DIALOG = '[E-ACCOUNT APP] CLOSE ACCDOCS DIALOG';
export const GET_MASTERS = '[E-ACCOUNT APP] GET MASTERS';
export const GET_ACCDOCS_STATUS = '[E-ACCOUNT APP] GET ACCDOCS STATUS';

export function getAccdocs(perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/accdoc-app/accdocs', {
        params: {
			limit: perPage,
			skip: skip
		}		
	});
	
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ACCDOCS,
                payload: response.data.accdocs,
				count: response.data.count
            })
        );
}

export function removeAccdocs(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/accdoc-app/accdocs/remove', { data: {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getAccdocs(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setAccdocsSearchText(event)
{
    return {
        type      : SET_ACCDOCS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setAccdocsStatusRadio(value)
{
    return {
        type      	: SET_ACCDOCS_STATUS_RADIO,
        statusRadio	: value
    }
}

export function openAccdocsMapDialog(data)
{
    return {
        type: OPEN_ACCDOCS_DIALOG,
        data
    }
}

export function closeAccdocsMapDialog()
{
    return {
        type: CLOSE_ACCDOCS_DIALOG
    }
}

export function getMasters()
{
    const request = axios.get('/api/accdoc-app/masters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTERS,
                payload: response.data
            })
        );
}

export function getAccdocsStatus() {
    const request = axios.get('/api/accdoc-app/accdocs/getAccdocsStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ACCDOCS_STATUS,
                payload: response.data
            })
        );
}

export function saveMasterOrder(ids, statusId, masterId) {
    const request = axios.post('/api/accdoc-app/save-master-order', {
		ids, statusId, masterId,
	});

    return (dispatch) =>
        request.then((response) => {
			dispatch(getAccdocs());	
			dispatch(closeAccdocsMapDialog());            
			return dispatch(showMessage({message: 'Data Save'}));
		}).catch((err) => {
			console.log(err);
			return dispatch(showMessage({message: 'Access Denied'}))
		});
}
