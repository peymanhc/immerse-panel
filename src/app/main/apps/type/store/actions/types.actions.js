import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_TYPES = '[TYPE APP] GET TYPES';
export const UPDATE_TYPES  = '[TYPE APP] UPDATE TYPES';
export const OPEN_NEW_TYPES_DIALOG = '[TYPE APP] OPEN NEW TYPES DIALOG';
export const CLOSE_NEW_TYPES_DIALOG = '[TYPE APP] CLOSE NEW TYPES DIALOG';
export const OPEN_EDIT_TYPES_DIALOG = '[TYPE APP] OPEN EDIT TYPES DIALOG';
export const CLOSE_EDIT_TYPES_DIALOG = '[TYPE APP] CLOSE EDIT TYPES DIALOG';
export const SET_TYPES_SEARCH_TEXT = '[TYPE APP] SET TYPES SEARCH TEXT';
export const TOGGLE_TYPES_ORDER_DESCENDING = '[TYPE APP] TOGGLE TYPES ORDER DESCENDING';
export const CHANGE_TYPES_ORDER = '[TYPE APP] CHANGE TYPES ORDER';
export const TOGGLE_STARRED = '[TYPE APP] TOGGLE TYPES STARRED';
export const TOGGLE_IMPORTANT = '[TYPE APP] TOGGLE TYPES IMPORTANT';
export const TOGGLE_ENABLE = '[TYPE APP] TOGGLE TYPES ENABLE';
export const TOGGLE_DISABLE = '[TYPE APP] TOGGLE TYPES DISABLE';
export const ADD_TYPES = '[TYPE APP] ADD TYPES';
export const REMOVE_TYPES = '[TYPE APP] REMOVE TYPES';
export const WAIT_TYPES = '[TYPE APP] ADD LOADING TYPES';



export function getTypes()
{
    const request = axios.get('/api/type-app/getTypes');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TYPES,
                payload: response.data
            })
        );
}
 
export function setTypesSearchText(event)
{
    return {
        type      : SET_TYPES_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeTypesOrder(orderBy)
{
    return {
        type: CHANGE_TYPES_ORDER,
        orderBy
    }
}

export function toggleTypesOrderDescending()
{
    return {
        type: TOGGLE_TYPES_ORDER_DESCENDING
    }
}

export function toggleTypesStarred(type)
{
    const newTypes = {
        ...type,
        starred: !type.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateTypes(newTypes)))
    )
}

export function toggleTypesImportant(type)
{
    const newTypes = {
        ...type,
        important: !type.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateTypes(newTypes)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "type_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/type-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/type-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateTypes(type)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_TYPES, payload: true});
		const {image_full} = type; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "type", "put"); 
				type["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				type["image_full"] = "";
			}
		}		
		const request = axios.put('/api/type-app/update-type', type);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_TYPES_DIALOG});
			dispatch({type: WAIT_TYPES, payload: false});
			return dispatch(getTypes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_TYPES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditTypesDialog()
{
    return {
        type: CLOSE_EDIT_TYPES_DIALOG
    }
}

export function closeNewTypesDialog()
{
    return {
        type: CLOSE_NEW_TYPES_DIALOG
    }
}

export function openEditTypesDialog(data)
{ 
    return {
        type: OPEN_EDIT_TYPES_DIALOG,
        data
    }
}

export function openNewTypesDialog()
{
    return {
        type: OPEN_NEW_TYPES_DIALOG
    }
}

export function addTypes(type)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_TYPES, payload: true});
		const {image_full} = type; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "type", "post"); 
				type["image_full"] = img.url;				
			}
			catch(err){ 
				type["image_full"] = "";
			}
		}		
		const request = axios.post('/api/type-app/new-type', type);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_TYPES_DIALOG});
			dispatch({type: WAIT_TYPES, payload: false});
			return dispatch(getTypes())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_TYPES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeTypes(typesId)
{
    const request = axios.delete('/api/type-app/remove-type', {data: {typeId:typesId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_TYPES
                    })
                ]).then(() => dispatch(getTypes()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
