import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_DICTIONARYS = '[DICTIONARY APP] GET DICTIONARYS';
export const UPDATE_DICTIONARYS  = '[DICTIONARY APP] UPDATE DICTIONARYS';
export const OPEN_NEW_DICTIONARYS_DIALOG = '[DICTIONARY APP] OPEN NEW DICTIONARYS DIALOG';
export const CLOSE_NEW_DICTIONARYS_DIALOG = '[DICTIONARY APP] CLOSE NEW DICTIONARYS DIALOG';
export const OPEN_EDIT_DICTIONARYS_DIALOG = '[DICTIONARY APP] OPEN EDIT DICTIONARYS DIALOG';
export const CLOSE_EDIT_DICTIONARYS_DIALOG = '[DICTIONARY APP] CLOSE EDIT DICTIONARYS DIALOG';
export const SET_DICTIONARYS_SEARCH_TEXT = '[DICTIONARY APP] SET DICTIONARYS SEARCH TEXT';
export const TOGGLE_DICTIONARYS_ORDER_DESCENDING = '[DICTIONARY APP] TOGGLE DICTIONARYS ORDER DESCENDING';
export const CHANGE_DICTIONARYS_ORDER = '[DICTIONARY APP] CHANGE DICTIONARYS ORDER';
export const TOGGLE_STARRED = '[DICTIONARY APP] TOGGLE DICTIONARYS STARRED';
export const TOGGLE_IMPORTANT = '[DICTIONARY APP] TOGGLE DICTIONARYS IMPORTANT';
export const TOGGLE_ENABLE = '[DICTIONARY APP] TOGGLE DICTIONARYS ENABLE';
export const TOGGLE_DISABLE = '[DICTIONARY APP] TOGGLE DICTIONARYS DISABLE';
export const ADD_DICTIONARYS = '[DICTIONARY APP] ADD DICTIONARYS';
export const REMOVE_DICTIONARYS = '[DICTIONARY APP] REMOVE DICTIONARYS';
export const WAIT_DICTIONARYS = '[DICTIONARY APP] ADD LOADING DICTIONARYS';
export const GET_TYPES = '[DICTIONARY APP] GET TYPES';


export function getDictionarys()
{
    const request = axios.get('/api/dictionary-app/getDictionarys');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DICTIONARYS,
                payload: response.data
            })
        );
}
 
export function setDictionarysSearchText(event)
{
    return {
        type      : SET_DICTIONARYS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeDictionarysOrder(orderBy)
{
    return {
        type: CHANGE_DICTIONARYS_ORDER,
        orderBy
    }
}

export function toggleDictionarysOrderDescending()
{
    return {
        type: TOGGLE_DICTIONARYS_ORDER_DESCENDING
    }
}

export function toggleDictionarysStarred(dictionary)
{
    const newDictionarys = {
        ...dictionary,
        starred: !dictionary.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateDictionarys(newDictionarys)))
    )
}

export function toggleDictionarysImportant(dictionary)
{
    const newDictionarys = {
        ...dictionary,
        important: !dictionary.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateDictionarys(newDictionarys)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "dictionary_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/dictionary-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/dictionary-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateDictionarys(dictionary)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_DICTIONARYS, payload: true});
		const {image_full, image_mobile, image_classic} = dictionary; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "dictionary", "put"); 
				dictionary["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				dictionary["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "dictionary", "put"); 
				dictionary["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				dictionary["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "dictionary", "put"); 
				dictionary["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				dictionary["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/dictionary-app/update-dictionary', dictionary);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_DICTIONARYS_DIALOG});
			dispatch({type: WAIT_DICTIONARYS, payload: false});
			return dispatch(getDictionarys())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_DICTIONARYS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditDictionarysDialog()
{
    return {
        type: CLOSE_EDIT_DICTIONARYS_DIALOG
    }
}

export function closeNewDictionarysDialog()
{
    return {
        type: CLOSE_NEW_DICTIONARYS_DIALOG
    }
}

export function openEditDictionarysDialog(data)
{ 
    return {
        type: OPEN_EDIT_DICTIONARYS_DIALOG,
        data
    }
}

export function openNewDictionarysDialog()
{
    return {
        type: OPEN_NEW_DICTIONARYS_DIALOG
    }
}

export function addDictionarys(dictionary)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_DICTIONARYS, payload: true});
		const {image_full, image_mobile, image_classic} = dictionary; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "dictionary", "post"); 
				dictionary["image_full"] = img.url;				
			}
			catch(err){ 
				dictionary["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "dictionary", "post"); 
				dictionary["image_mobile"] = img.url;				
			}
			catch(err){ 
				dictionary["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "dictionary", "post"); 
				dictionary["image_classic"] = img.url;				
			}
			catch(err){ 
				dictionary["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/dictionary-app/new-dictionary', dictionary);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_DICTIONARYS_DIALOG});
			dispatch({type: WAIT_DICTIONARYS, payload: false});
			return dispatch(getDictionarys())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_DICTIONARYS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeDictionarys(dictionarysId)
{
    const request = axios.delete('/api/dictionary-app/remove-dictionary', {data: {dictionaryId:dictionarysId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_DICTIONARYS
                    })
                ]).then(() => dispatch(getDictionarys()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
