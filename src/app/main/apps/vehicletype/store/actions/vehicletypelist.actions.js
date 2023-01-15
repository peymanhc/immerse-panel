import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_VEHICLETYPELIST = '[VEHICLETYPE APP] GET VEHICLETYPELIST';
export const UPDATE_VEHICLETYPELIST  = '[VEHICLETYPE APP] UPDATE VEHICLETYPELIST';
export const OPEN_NEW_VEHICLETYPELIST_DIALOG = '[VEHICLETYPE APP] OPEN NEW VEHICLETYPELIST DIALOG';
export const CLOSE_NEW_VEHICLETYPELIST_DIALOG = '[VEHICLETYPE APP] CLOSE NEW VEHICLETYPELIST DIALOG';
export const OPEN_EDIT_VEHICLETYPELIST_DIALOG = '[VEHICLETYPE APP] OPEN EDIT VEHICLETYPELIST DIALOG';
export const CLOSE_EDIT_VEHICLETYPELIST_DIALOG = '[VEHICLETYPE APP] CLOSE EDIT VEHICLETYPELIST DIALOG';
export const SET_VEHICLETYPELIST_SEARCH_TEXT = '[VEHICLETYPE APP] SET VEHICLETYPELIST SEARCH TEXT';
export const TOGGLE_VEHICLETYPELIST_ORDER_DESCENDING = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELIST ORDER DESCENDING';
export const CHANGE_VEHICLETYPELIST_ORDER = '[VEHICLETYPE APP] CHANGE VEHICLETYPELIST ORDER';
export const TOGGLE_STARRED = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELIST STARRED';
export const TOGGLE_IMPORTANT = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELIST IMPORTANT';
export const TOGGLE_ENABLE = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELIST ENABLE';
export const TOGGLE_DISABLE = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELIST DISABLE';
export const ADD_VEHICLETYPELIST = '[VEHICLETYPE APP] ADD VEHICLETYPELIST';
export const REMOVE_VEHICLETYPELIST = '[VEHICLETYPE APP] REMOVE VEHICLETYPELIST';
export const WAIT_VEHICLETYPELIST = '[VEHICLETYPE APP] ADD LOADING VEHICLETYPELIST';
export const GET_TYPES = '[VEHICLETYPE APP] GET TYPES';


export function getVehicletypelist()
{
    const request = axios.get('/api/vehicletype-app/getVehicletypelist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VEHICLETYPELIST,
                payload: response.data
            })
        );
}
 
export function setVehicletypelistSearchText(event)
{
    return {
        type      : SET_VEHICLETYPELIST_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeVehicletypelistOrder(orderBy)
{
    return {
        type: CHANGE_VEHICLETYPELIST_ORDER,
        orderBy
    }
}

export function toggleVehicletypelistOrderDescending()
{
    return {
        type: TOGGLE_VEHICLETYPELIST_ORDER_DESCENDING
    }
}

export function toggleVehicletypelistStarred(vehicletype)
{
    const newVehicletypelist = {
        ...vehicletype,
        starred: !vehicletype.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateVehicletypelist(newVehicletypelist)))
    )
}

export function toggleVehicletypelistImportant(vehicletype)
{
    const newVehicletypelist = {
        ...vehicletype,
        important: !vehicletype.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateVehicletypelist(newVehicletypelist)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "vehicletype_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/vehicletype-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/vehicletype-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateVehicletypelist(vehicletype)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_VEHICLETYPELIST, payload: true});
		const {image_full, image_mobile, image_classic} = vehicletype; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "vehicletype", "put"); 
				vehicletype["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				vehicletype["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "vehicletype", "put"); 
				vehicletype["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				vehicletype["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "vehicletype", "put"); 
				vehicletype["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				vehicletype["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/vehicletype-app/update-vehicletype', vehicletype);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_VEHICLETYPELIST_DIALOG});
			dispatch({type: WAIT_VEHICLETYPELIST, payload: false});
			return dispatch(getVehicletypelist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_VEHICLETYPELIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditVehicletypelistDialog()
{
    return {
        type: CLOSE_EDIT_VEHICLETYPELIST_DIALOG
    }
}

export function closeNewVehicletypelistDialog()
{
    return {
        type: CLOSE_NEW_VEHICLETYPELIST_DIALOG
    }
}

export function openEditVehicletypelistDialog(data)
{ 
    return {
        type: OPEN_EDIT_VEHICLETYPELIST_DIALOG,
        data
    }
}

export function openNewVehicletypelistDialog()
{
    return {
        type: OPEN_NEW_VEHICLETYPELIST_DIALOG
    }
}

export function addVehicletypelist(vehicletype)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_VEHICLETYPELIST, payload: true});
		const {image_full, image_mobile, image_classic} = vehicletype; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "vehicletype", "post"); 
				vehicletype["image_full"] = img.url;				
			}
			catch(err){ 
				vehicletype["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "vehicletype", "post"); 
				vehicletype["image_mobile"] = img.url;				
			}
			catch(err){ 
				vehicletype["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "vehicletype", "post"); 
				vehicletype["image_classic"] = img.url;				
			}
			catch(err){ 
				vehicletype["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/vehicletype-app/new-vehicletype', vehicletype);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_VEHICLETYPELIST_DIALOG});
			dispatch({type: WAIT_VEHICLETYPELIST, payload: false});
			return dispatch(getVehicletypelist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_VEHICLETYPELIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeVehicletypelist(vehicletypelistId)
{
    const request = axios.delete('/api/vehicletype-app/remove-vehicletype', {data: {vehicletypeId:vehicletypelistId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_VEHICLETYPELIST
                    })
                ]).then(() => dispatch(getVehicletypelist()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
