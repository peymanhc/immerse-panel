import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_WARRANTYLISTSTATUS = '[E-COMMERCE APP] GET WARRANTYLISTSTATUS';
export const UPDATE_WARRANTYLISTSTATUS  = '[E-COMMERCE APP] UPDATE WARRANTYLISTSTATUS';
export const OPEN_NEW_WARRANTYLISTSTATUS_DIALOG = '[E-COMMERCE APP] OPEN NEW WARRANTYLISTSTATUS DIALOG';
export const CLOSE_NEW_WARRANTYLISTSTATUS_DIALOG = '[E-COMMERCE APP] CLOSE NEW WARRANTYLISTSTATUS DIALOG';
export const OPEN_EDIT_WARRANTYLISTSTATUS_DIALOG = '[E-COMMERCE APP] OPEN EDIT WARRANTYLISTSTATUS DIALOG';
export const CLOSE_EDIT_WARRANTYLISTSTATUS_DIALOG = '[E-COMMERCE APP] CLOSE EDIT WARRANTYLISTSTATUS DIALOG';
export const SET_WARRANTYLISTSTATUS_SEARCH_TEXT = '[E-COMMERCE APP] SET WARRANTYLISTSTATUS SEARCH TEXT';
export const TOGGLE_WARRANTYLISTSTATUS_WARRANTY_DESCENDING = '[E-COMMERCE APP] TOGGLE WARRANTYLISTSTATUS WARRANTY DESCENDING';
export const CHANGE_WARRANTYLISTSTATUS_WARRANTY = '[E-COMMERCE APP] CHANGE WARRANTYLISTSTATUS WARRANTY';
export const TOGGLE_STARRED = '[E-COMMERCE APP] TOGGLE WARRANTYLISTSTATUS STARRED';
export const TOGGLE_IMPORTANT = '[E-COMMERCE APP] TOGGLE WARRANTYLISTSTATUS IMPORTANT';
export const TOGGLE_ENABLE = '[E-COMMERCE APP] TOGGLE WARRANTYLISTSTATUS ENABLE';
export const TOGGLE_DISABLE = '[E-COMMERCE APP] TOGGLE WARRANTYLISTSTATUS DISABLE';
export const ADD_WARRANTYLISTSTATUS = '[E-COMMERCE APP] ADD WARRANTYLISTSTATUS';
export const REMOVE_WARRANTYLISTSTATUS = '[E-COMMERCE APP] REMOVE WARRANTYLISTSTATUS';
export const WAIT_WARRANTYLISTSTATUS = '[E-COMMERCE APP] ADD LOADING WARRANTYLISTSTATUS';
export const GET_TYPES = '[E-COMMERCE APP] GET TYPES';


export function getWarrantylistStatus1()
{
    const request = axios.get('/api/warranty-app/warrantylist/getWarrantylistStatus');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTYLISTSTATUS,
                payload: response.data
            })
        );
}

 
 
export function setWarrantylistStatusSearchText(event)
{
    return {
        type      : SET_WARRANTYLISTSTATUS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeWarrantylistStatusWarranty(orderBy)
{
    return {
        type: CHANGE_WARRANTYLISTSTATUS_WARRANTY,
        orderBy
    }
}

export function toggleWarrantylistStatusWarrantyDescending()
{
    return {
        type: TOGGLE_WARRANTYLISTSTATUS_WARRANTY_DESCENDING
    }
}

export function toggleWarrantylistStatusStarred(warrantylistStatus)
{
    const newWarrantylistStatus = {
        ...warrantylistStatus,
        starred: !warrantylistStatus.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateWarrantylistStatus(newWarrantylistStatus)))
    )
}

export function toggleWarrantylistStatusImportant(warrantylistStatus)
{
    const newWarrantylistStatus = {
        ...warrantylistStatus,
        important: !warrantylistStatus.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateWarrantylistStatus(newWarrantylistStatus)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "warranty" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/warranty-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/warranty-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};
export function updateWarrantylistStatus(warrantylistStatus)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: true});
		const {imgSrc} = warrantylistStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "warrantyS", "put"); 
				warrantylistStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				warrantylistStatus["imgSrc"] = "";
			}
		}	
		const request = axios.put('/api/warranty-app/update-warrantylistStatus', warrantylistStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_WARRANTYLISTSTATUS_DIALOG});
			dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: false});
			return dispatch(getWarrantylistStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditWarrantylistStatusDialog()
{
    return {
        type: CLOSE_EDIT_WARRANTYLISTSTATUS_DIALOG
    }
}

export function closeNewWarrantylistStatusDialog()
{
    return {
        type: CLOSE_NEW_WARRANTYLISTSTATUS_DIALOG
    }
}

export function openEditWarrantylistStatusDialog(data)
{ 
    return {
        type: OPEN_EDIT_WARRANTYLISTSTATUS_DIALOG,
        data
    }
}

export function openNewWarrantylistStatusDialog()
{
    return {
        type: OPEN_NEW_WARRANTYLISTSTATUS_DIALOG
    }
}

export function addWarrantylistStatus(warrantylistStatus)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: true});
		const {imgSrc} = warrantylistStatus; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "warrantyS", "post"); 
				warrantylistStatus["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				warrantylistStatus["imgSrc"] = "";
			}
		}	
		const request = axios.post('/api/warranty-app/new-status', warrantylistStatus);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_WARRANTYLISTSTATUS_DIALOG});
			dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: false});
			return dispatch(getWarrantylistStatus1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYLISTSTATUS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeWarrantylistStatus(warrantylistStatusId)
{
    const request = axios.delete('/api/warranty-app/remove-warrantylistStatus', {data: {statusId:warrantylistStatusId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_WARRANTYLISTSTATUS
                    })
                ]).then(() => dispatch(getWarrantylistStatus1()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}