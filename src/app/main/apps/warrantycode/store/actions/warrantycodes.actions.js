import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_WARRANTYCODES = '[WARRANTYCODE APP] GET WARRANTYCODES';
export const UPDATE_WARRANTYCODES  = '[WARRANTYCODE APP] UPDATE WARRANTYCODES';
export const OPEN_NEW_WARRANTYCODES_DIALOG = '[WARRANTYCODE APP] OPEN NEW WARRANTYCODES DIALOG';
export const CLOSE_NEW_WARRANTYCODES_DIALOG = '[WARRANTYCODE APP] CLOSE NEW WARRANTYCODES DIALOG';
export const OPEN_EDIT_WARRANTYCODES_DIALOG = '[WARRANTYCODE APP] OPEN EDIT WARRANTYCODES DIALOG';
export const CLOSE_EDIT_WARRANTYCODES_DIALOG = '[WARRANTYCODE APP] CLOSE EDIT WARRANTYCODES DIALOG';
export const SET_WARRANTYCODES_SEARCH_TEXT = '[WARRANTYCODE APP] SET WARRANTYCODES SEARCH TEXT';
export const TOGGLE_WARRANTYCODES_ORDER_DESCENDING = '[WARRANTYCODE APP] TOGGLE WARRANTYCODES ORDER DESCENDING';
export const CHANGE_WARRANTYCODES_ORDER = '[WARRANTYCODE APP] CHANGE WARRANTYCODES ORDER';
export const TOGGLE_STARRED = '[WARRANTYCODE APP] TOGGLE WARRANTYCODES STARRED';
export const TOGGLE_IMPORTANT = '[WARRANTYCODE APP] TOGGLE WARRANTYCODES IMPORTANT';
export const TOGGLE_ENABLE = '[WARRANTYCODE APP] TOGGLE WARRANTYCODES ENABLE';
export const TOGGLE_DISABLE = '[WARRANTYCODE APP] TOGGLE WARRANTYCODES DISABLE';
export const ADD_WARRANTYCODES = '[WARRANTYCODE APP] ADD WARRANTYCODES';
export const REMOVE_WARRANTYCODES = '[WARRANTYCODE APP] REMOVE WARRANTYCODES';
export const WAIT_WARRANTYCODES = '[WARRANTYCODE APP] ADD LOADING WARRANTYCODES';
export const GET_TYPES = '[WARRANTYCODE APP] GET TYPES';
export const OPEN_WARRANTYCODES_EXCEL_DIALOG = '[E-COMMERCE APP] OPEN_WARRANTYCODES_EXCEL_DIALOG';
export const CLOSE_WARRANTYCODES_EXCEL_DIALOG = '[E-COMMERCE APP] CLOSE_WARRANTYCODES_EXCEL_DIALOG';
export const WAIT_WARRANTYCODES_EXCEL = '[E-COMMERCE APP] WAIT_WARRANTYCODES_EXCEL';




export function closeWarrantycodesUploadDialog()
{
    return {
        type: CLOSE_WARRANTYCODES_EXCEL_DIALOG
    }
}

export function openWarrantycodesUploadDialog()
{ 
    return {
        type: OPEN_WARRANTYCODES_EXCEL_DIALOG
    }
}

export function uploadExcelToWarrantycodes(file)
{
    	
    return (dispatch) => {
		dispatch({type: WAIT_WARRANTYCODES_EXCEL, payload: true});
		return uploadExcel(file).then((excel) => { 
			//console.log(excel);
			if(excel.url === undefined)
				dispatch(showMessage({message: 'Format file is not valid.'}));			
			else
				dispatch(showMessage({message: file.name + ' has been successfully uploaded.'}));
			dispatch({type: WAIT_WARRANTYCODES_EXCEL, payload: false});
			return new Promise((resolve, reject)=> {
				if(excel.url === undefined)
					reject();
				else
					resolve(excel.url); 
			});
		}).catch(err => {
			dispatch({type: WAIT_WARRANTYCODES_EXCEL, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	}

}

const uploadExcel = (file) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_e_" + FuseUtils.generateGUID() + "_" ;
		formData.append(fileName, file);
		axios.post('/api/warrantycode-app/excel-upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};



export function getWarrantycodes()
{
    const request = axios.get('/api/warrantycode-app/getWarrantycodes');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WARRANTYCODES,
                payload: response.data
            })
        );
}
 
export function setWarrantycodesSearchText(event)
{
    return {
        type      : SET_WARRANTYCODES_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeWarrantycodesOrder(orderBy)
{
    return {
        type: CHANGE_WARRANTYCODES_ORDER,
        orderBy
    }
}

export function toggleWarrantycodesOrderDescending()
{
    return {
        type: TOGGLE_WARRANTYCODES_ORDER_DESCENDING
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
		dispatch({type: WAIT_WARRANTYCODES, payload: true});
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
			dispatch({type: CLOSE_EDIT_WARRANTYCODES_DIALOG});
			dispatch({type: WAIT_WARRANTYCODES, payload: false});
			return dispatch(getWarrantycodes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYCODES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditWarrantycodesDialog()
{
    return {
        type: CLOSE_EDIT_WARRANTYCODES_DIALOG
    }
}

export function closeNewWarrantycodesDialog()
{
    return {
        type: CLOSE_NEW_WARRANTYCODES_DIALOG
    }
}

export function openEditWarrantycodesDialog(data)
{ 
    return {
        type: OPEN_EDIT_WARRANTYCODES_DIALOG,
        data
    }
}

export function openNewWarrantycodesDialog()
{
    return {
        type: OPEN_NEW_WARRANTYCODES_DIALOG
    }
}

export function addWarrantycodes(warrantycode)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_WARRANTYCODES, payload: true});
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
			dispatch({type: CLOSE_NEW_WARRANTYCODES_DIALOG});
			dispatch({type: WAIT_WARRANTYCODES, payload: false});
			return dispatch(getWarrantycodes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WARRANTYCODES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeWarrantycodes(warrantycodesId)
{
    const request = axios.delete('/api/warrantycode-app/remove-warrantycode', {data: {warrantycodeId:warrantycodesId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_WARRANTYCODES
                    })
                ]).then(() => dispatch(getWarrantycodes()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
