import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_WEREHOUSELIST = '[WEREHOUSE APP] GET WEREHOUSELIST';
export const UPDATE_WEREHOUSELIST  = '[WEREHOUSE APP] UPDATE WEREHOUSELIST';
export const OPEN_NEW_WEREHOUSELIST_DIALOG = '[WEREHOUSE APP] OPEN NEW WEREHOUSELIST DIALOG';
export const CLOSE_NEW_WEREHOUSELIST_DIALOG = '[WEREHOUSE APP] CLOSE NEW WEREHOUSELIST DIALOG';
export const OPEN_EDIT_WEREHOUSELIST_DIALOG = '[WEREHOUSE APP] OPEN EDIT WEREHOUSELIST DIALOG';
export const CLOSE_EDIT_WEREHOUSELIST_DIALOG = '[WEREHOUSE APP] CLOSE EDIT WEREHOUSELIST DIALOG';
export const SET_WEREHOUSELIST_SEARCH_TEXT = '[WEREHOUSE APP] SET WEREHOUSELIST SEARCH TEXT';
export const TOGGLE_WEREHOUSELIST_ORDER_DESCENDING = '[WEREHOUSE APP] TOGGLE WEREHOUSELIST ORDER DESCENDING';
export const CHANGE_WEREHOUSELIST_ORDER = '[WEREHOUSE APP] CHANGE WEREHOUSELIST ORDER';
export const TOGGLE_STARRED = '[WEREHOUSE APP] TOGGLE WEREHOUSELIST STARRED';
export const TOGGLE_IMPORTANT = '[WEREHOUSE APP] TOGGLE WEREHOUSELIST IMPORTANT';
export const TOGGLE_ENABLE = '[WEREHOUSE APP] TOGGLE WEREHOUSELIST ENABLE';
export const TOGGLE_DISABLE = '[WEREHOUSE APP] TOGGLE WEREHOUSELIST DISABLE';
export const ADD_WEREHOUSELIST = '[WEREHOUSE APP] ADD WEREHOUSELIST';
export const REMOVE_WEREHOUSELIST = '[WEREHOUSE APP] REMOVE WEREHOUSELIST';
export const WAIT_WEREHOUSELIST = '[WEREHOUSE APP] ADD LOADING WEREHOUSELIST';
export const GET_TYPES = '[WEREHOUSE APP] GET TYPES';


export function getWerehouselist()
{
    const request = axios.get('/api/werehouse-app/getWerehouselist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_WEREHOUSELIST,
                payload: response.data
            })
        );
}
 
export function setWerehouselistSearchText(event)
{
    return {
        type      : SET_WEREHOUSELIST_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeWerehouselistOrder(orderBy)
{
    return {
        type: CHANGE_WEREHOUSELIST_ORDER,
        orderBy
    }
}

export function toggleWerehouselistOrderDescending()
{
    return {
        type: TOGGLE_WEREHOUSELIST_ORDER_DESCENDING
    }
}

export function toggleWerehouselistStarred(werehouse)
{
    const newWerehouselist = {
        ...werehouse,
        starred: !werehouse.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateWerehouselist(newWerehouselist)))
    )
}

export function toggleWerehouselistImportant(werehouse)
{
    const newWerehouselist = {
        ...werehouse,
        important: !werehouse.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateWerehouselist(newWerehouselist)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "werehouse_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/werehouse-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/werehouse-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateWerehouselist(werehouse)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_WEREHOUSELIST, payload: true});
		const {image_full, image_mobile, image_classic} = werehouse; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "werehouse", "put"); 
				werehouse["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				werehouse["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "werehouse", "put"); 
				werehouse["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				werehouse["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "werehouse", "put"); 
				werehouse["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				werehouse["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/werehouse-app/update-werehouse', werehouse);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_WEREHOUSELIST_DIALOG});
			dispatch({type: WAIT_WEREHOUSELIST, payload: false});
			return dispatch(getWerehouselist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WEREHOUSELIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditWerehouselistDialog()
{
    return {
        type: CLOSE_EDIT_WEREHOUSELIST_DIALOG
    }
}

export function closeNewWerehouselistDialog()
{
    return {
        type: CLOSE_NEW_WEREHOUSELIST_DIALOG
    }
}

export function openEditWerehouselistDialog(data)
{ 
    return {
        type: OPEN_EDIT_WEREHOUSELIST_DIALOG,
        data
    }
}

export function openNewWerehouselistDialog()
{
    return {
        type: OPEN_NEW_WEREHOUSELIST_DIALOG
    }
}

export function addWerehouselist(werehouse)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_WEREHOUSELIST, payload: true});
		const {image_full, image_mobile, image_classic} = werehouse; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "werehouse", "post"); 
				werehouse["image_full"] = img.url;				
			}
			catch(err){ 
				werehouse["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "werehouse", "post"); 
				werehouse["image_mobile"] = img.url;				
			}
			catch(err){ 
				werehouse["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "werehouse", "post"); 
				werehouse["image_classic"] = img.url;				
			}
			catch(err){ 
				werehouse["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/werehouse-app/new-werehouse', werehouse);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_WEREHOUSELIST_DIALOG});
			dispatch({type: WAIT_WEREHOUSELIST, payload: false});
			return dispatch(getWerehouselist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_WEREHOUSELIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeWerehouselist(werehouselistId)
{
    const request = axios.delete('/api/werehouse-app/remove-werehouse', {data: {werehouseId:werehouselistId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_WEREHOUSELIST
                    })
                ]).then(() => dispatch(getWerehouselist()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
