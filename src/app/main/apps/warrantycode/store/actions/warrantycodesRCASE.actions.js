import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_WARRANTYCODESCASE = '[WARRANTYCODE APP] GET WARRANTYCODESCASE';
export const UPDATE_WARRANTYCODESCASE  = '[WARRANTYCODE APP] UPDATE WARRANTYCODESCASE';
export const OPEN_NEW_WARRANTYCODESCASE_DIALOG = '[WARRANTYCODE APP] OPEN NEW WARRANTYCODESCASE DIALOG';
export const CLOSE_NEW_WARRANTYCODESCASE_DIALOG = '[WARRANTYCODE APP] CLOSE NEW WARRANTYCODESCASE DIALOG';
export const OPEN_EDIT_WARRANTYCODESCASE_DIALOG = '[WARRANTYCODE APP] OPEN EDIT WARRANTYCODESCASE DIALOG';
export const CLOSE_EDIT_WARRANTYCODESCASE_DIALOG = '[WARRANTYCODE APP] CLOSE EDIT WARRANTYCODESCASE DIALOG';
export const SET_WARRANTYCODESCASE_SEARCH_TEXT = '[WARRANTYCODE APP] SET WARRANTYCODESCASE SEARCH TEXT';
export const TOGGLE_WARRANTYCODESCASE_ORDER_DESCENDING = '[WARRANTYCODE APP] TOGGLE WARRANTYCODESCASE ORDER DESCENDING';
export const CHANGE_WARRANTYCODESCASE_ORDER = '[WARRANTYCODE APP] CHANGE WARRANTYCODESCASE ORDER';
export const TOGGLE_STARRED = '[WARRANTYCODE APP] TOGGLE WARRANTYCODESCASE STARRED';
export const TOGGLE_IMPORTANT = '[WARRANTYCODE APP] TOGGLE WARRANTYCODESCASE IMPORTANT';
export const TOGGLE_ENABLE = '[WARRANTYCODE APP] TOGGLE WARRANTYCODESCASE ENABLE';
export const TOGGLE_DISABLE = '[WARRANTYCODE APP] TOGGLE WARRANTYCODESCASE DISABLE';
export const ADD_WARRANTYCODESCASE = '[WARRANTYCODE APP] ADD WARRANTYCODESCASE';
export const REMOVE_WARRANTYCODESCASE = '[WARRANTYCODE APP] REMOVE WARRANTYCODESCASE';
export const WAIT_WARRANTYCODESCASE = '[WARRANTYCODE APP] ADD LOADING WARRANTYCODESCASE';
export const GET_TYPES = '[WARRANTYCODE APP] GET TYPES';


export function getWarrantycodes()
{
    const request = axios.get('/api/warrantycode-app/getWarrantycodes');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTYCODESCASE,
                payload: response.data
            })
        );
}
 
export function setWarrantycodesSearchText(event)
{
    return {
        type      : SET_WARRANTYCODESCASE_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeWarrantycodesOrder(orderBy)
{
    return {
        type: CHANGE_WARRANTYCODESCASE_ORDER,
        orderBy
    }
}

export function toggleWarrantycodesOrderDescending()
{
    return {
        type: TOGGLE_WARRANTYCODESCASE_ORDER_DESCENDING
    }
}

export function toggleWarrantycodesStarred(warrantycode)
{
    const newWarrantycodes = {
        ...warrantycode,
        starred: !warrantycode.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateWarrantycodes(newWarrantycodes)))
    )
}

export function toggleWarrantycodesImportant(warrantycode)
{
    const newWarrantycodes = {
        ...warrantycode,
        important: !warrantycode.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateWarrantycodes(newWarrantycodes)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "warrantycode_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/warrantycode-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/warrantycode-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateWarrantycodes(warrantycode)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_WARRANTYCODESCASE, payload: true});
		const {image_full, image_mobile, image_classic} = warrantycode; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "warrantycode", "put"); 
				warrantycode["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				warrantycode["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "warrantycode", "put"); 
				warrantycode["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				warrantycode["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "warrantycode", "put"); 
				warrantycode["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				warrantycode["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/warrantycode-app/update-warrantycode', warrantycode);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_WARRANTYCODESCASE_DIALOG});
			dispatch({type: WAIT_WARRANTYCODESCASE, payload: false});
			return dispatch(getWarrantycodes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYCODESCASE, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditWarrantycodesDialog()
{
    return {
        type: CLOSE_EDIT_WARRANTYCODESCASE_DIALOG
    }
}

export function closeNewWarrantycodesDialog()
{
    return {
        type: CLOSE_NEW_WARRANTYCODESCASE_DIALOG
    }
}

export function openEditWarrantycodesDialog(data)
{ 
    return {
        type: OPEN_EDIT_WARRANTYCODESCASE_DIALOG,
        data
    }
}

export function openNewWarrantycodesDialog()
{
    return {
        type: OPEN_NEW_WARRANTYCODESCASE_DIALOG
    }
}

export function addWarrantycodes(warrantycode)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_WARRANTYCODESCASE, payload: true});
		const {image_full, image_mobile, image_classic} = warrantycode; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "warrantycode", "post"); 
				warrantycode["image_full"] = img.url;				
			}
			catch(err){ 
				warrantycode["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "warrantycode", "post"); 
				warrantycode["image_mobile"] = img.url;				
			}
			catch(err){ 
				warrantycode["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "warrantycode", "post"); 
				warrantycode["image_classic"] = img.url;				
			}
			catch(err){ 
				warrantycode["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/warrantycode-app/new-warrantycode', warrantycode);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_WARRANTYCODESCASE_DIALOG});
			dispatch({type: WAIT_WARRANTYCODESCASE, payload: false});
			return dispatch(getWarrantycodes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYCODESCASE, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeWarrantycodes(warrantycodesCASEId)
{
    const request = axios.delete('/api/warrantycode-app/remove-warrantycode', {data: {warrantycodeId:warrantycodesCASEId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_WARRANTYCODESCASE
                    })
                ]).then(() => dispatch(getWarrantycodes()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
