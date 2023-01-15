import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_ACCDOCSSTATUS = '[E-ACCOUNT APP] GET ACCDOCSSTATUS';
export const UPDATE_ACCDOCSSTATUS  = '[E-ACCOUNT APP] UPDATE ACCDOCSSTATUS';
export const OPEN_NEW_ACCDOCSSTATUS_DIALOG = '[E-ACCOUNT APP] OPEN NEW ACCDOCSSTATUS DIALOG';
export const CLOSE_NEW_ACCDOCSSTATUS_DIALOG = '[E-ACCOUNT APP] CLOSE NEW ACCDOCSSTATUS DIALOG';
export const OPEN_EDIT_ACCDOCSSTATUS_DIALOG = '[E-ACCOUNT APP] OPEN EDIT ACCDOCSSTATUS DIALOG';
export const CLOSE_EDIT_ACCDOCSSTATUS_DIALOG = '[E-ACCOUNT APP] CLOSE EDIT ACCDOCSSTATUS DIALOG';
export const SET_ACCDOCSSTATUS_SEARCH_TEXT = '[E-ACCOUNT APP] SET ACCDOCSSTATUS SEARCH TEXT';
export const TOGGLE_ACCDOCSSTATUS_ACCDOC_DESCENDING = '[E-ACCOUNT APP] TOGGLE ACCDOCSSTATUS ACCDOC DESCENDING';
export const CHANGE_ACCDOCSSTATUS_ACCDOC = '[E-ACCOUNT APP] CHANGE ACCDOCSSTATUS ACCDOC';
export const TOGGLE_STARRED = '[E-ACCOUNT APP] TOGGLE ACCDOCSSTATUS STARRED';
export const TOGGLE_IMPORTANT = '[E-ACCOUNT APP] TOGGLE ACCDOCSSTATUS IMPORTANT';
export const TOGGLE_ENABLE = '[E-ACCOUNT APP] TOGGLE ACCDOCSSTATUS ENABLE';
export const TOGGLE_DISABLE = '[E-ACCOUNT APP] TOGGLE ACCDOCSSTATUS DISABLE';
export const ADD_ACCDOCSSTATUS = '[E-ACCOUNT APP] ADD ACCDOCSSTATUS';
export const REMOVE_ACCDOCSSTATUS = '[E-ACCOUNT APP] REMOVE ACCDOCSSTATUS';
export const WAIT_ACCDOCSSTATUS = '[E-ACCOUNT APP] ADD LOADING ACCDOCSSTATUS';
export const GET_TYPES = '[E-ACCOUNT APP] GET TYPES';


export function getAccdocsStatus1()
{
    const request = axios.get('/api/accdoc-app/accdocs/getAccdocsStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ACCDOCSSTATUS,
                payload: response.data
            })
        );
}

 
 
export function setAccdocsStatusSearchText(event)
{
    return {
        type      : SET_ACCDOCSSTATUS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeAccdocsStatusOrder(orderBy)
{
    return {
        type: CHANGE_ACCDOCSSTATUS_ACCDOC,
        orderBy
    }
}

export function toggleAccdocsStatusOrderDescending()
{
    return {
        type: TOGGLE_ACCDOCSSTATUS_ACCDOC_DESCENDING
    }
}

export function toggleAccdocsStatusStarred(accdocsStatus)
{
    const newAccdocsStatus = {
        ...accdocsStatus,
        starred: !accdocsStatus.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateAccdocsStatus(newAccdocsStatus)))
    )
}

export function toggleAccdocsStatusImportant(accdocsStatus)
{
    const newAccdocsStatus = {
        ...accdocsStatus,
        important: !accdocsStatus.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateAccdocsStatus(newAccdocsStatus)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "order_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/accdoc-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/accdoc-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};
export function updateAccdocsStatus(accdocsStatus)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_ACCDOCSSTATUS, payload: true});
		const {imgSrc} = accdocsStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "orderS", "put"); 
				accdocsStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				accdocsStatus["imgSrc"] = "";
			}
		}	
		const request = axios.put('/api/accdoc-app/update-accdocsStatus', accdocsStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_ACCDOCSSTATUS_DIALOG});
			dispatch({type: WAIT_ACCDOCSSTATUS, payload: false});
			return dispatch(getAccdocsStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_ACCDOCSSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditAccdocsStatusDialog()
{
    return {
        type: CLOSE_EDIT_ACCDOCSSTATUS_DIALOG
    }
}

export function closeNewAccdocsStatusDialog()
{
    return {
        type: CLOSE_NEW_ACCDOCSSTATUS_DIALOG
    }
}

export function openEditAccdocsStatusDialog(data)
{ 
    return {
        type: OPEN_EDIT_ACCDOCSSTATUS_DIALOG,
        data
    }
}

export function openNewAccdocsStatusDialog()
{
    return {
        type: OPEN_NEW_ACCDOCSSTATUS_DIALOG
    }
}

export function addAccdocsStatus(accdocsStatus)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_ACCDOCSSTATUS, payload: true});
		const {imgSrc} = accdocsStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "orderS", "post"); 
				accdocsStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				accdocsStatus["imgSrc"] = "";
			}
		}	
		const request = axios.post('/api/accdoc-app/new-status', accdocsStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_ACCDOCSSTATUS_DIALOG});
			dispatch({type: WAIT_ACCDOCSSTATUS, payload: false});
			return dispatch(getAccdocsStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_ACCDOCSSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeAccdocsStatus(accdocsStatusId)
{
    const request = axios.delete('/api/accdoc-app/remove-accdocsStatus', {data: {statusId:accdocsStatusId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_ACCDOCSSTATUS
                    })
                ]).then(() => dispatch(getAccdocsStatus1()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}