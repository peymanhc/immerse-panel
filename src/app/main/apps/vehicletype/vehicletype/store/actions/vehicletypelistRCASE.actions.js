import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_VEHICLETYPELISTCASE = '[VEHICLETYPE APP] GET VEHICLETYPELISTCASE';
export const UPDATE_VEHICLETYPELISTCASE  = '[VEHICLETYPE APP] UPDATE VEHICLETYPELISTCASE';
export const OPEN_NEW_VEHICLETYPELISTCASE_DIALOG = '[VEHICLETYPE APP] OPEN NEW VEHICLETYPELISTCASE DIALOG';
export const CLOSE_NEW_VEHICLETYPELISTCASE_DIALOG = '[VEHICLETYPE APP] CLOSE NEW VEHICLETYPELISTCASE DIALOG';
export const OPEN_EDIT_VEHICLETYPELISTCASE_DIALOG = '[VEHICLETYPE APP] OPEN EDIT VEHICLETYPELISTCASE DIALOG';
export const CLOSE_EDIT_VEHICLETYPELISTCASE_DIALOG = '[VEHICLETYPE APP] CLOSE EDIT VEHICLETYPELISTCASE DIALOG';
export const SET_VEHICLETYPELISTCASE_SEARCH_TEXT = '[VEHICLETYPE APP] SET VEHICLETYPELISTCASE SEARCH TEXT';
export const TOGGLE_VEHICLETYPELISTCASE_ORDER_DESCENDING = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELISTCASE ORDER DESCENDING';
export const CHANGE_VEHICLETYPELISTCASE_ORDER = '[VEHICLETYPE APP] CHANGE VEHICLETYPELISTCASE ORDER';
export const TOGGLE_STARRED = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELISTCASE STARRED';
export const TOGGLE_IMPORTANT = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELISTCASE IMPORTANT';
export const TOGGLE_ENABLE = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELISTCASE ENABLE';
export const TOGGLE_DISABLE = '[VEHICLETYPE APP] TOGGLE VEHICLETYPELISTCASE DISABLE';
export const ADD_VEHICLETYPELISTCASE = '[VEHICLETYPE APP] ADD VEHICLETYPELISTCASE';
export const REMOVE_VEHICLETYPELISTCASE = '[VEHICLETYPE APP] REMOVE VEHICLETYPELISTCASE';
export const WAIT_VEHICLETYPELISTCASE = '[VEHICLETYPE APP] ADD LOADING VEHICLETYPELISTCASE';
export const GET_TYPES = '[VEHICLETYPE APP] GET TYPES';


export function getVehicletypelist()
{
    const request = axios.get('/api/vehicletype-app/getVehicletypelist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_VEHICLETYPELISTCASE,
                payload: response.data
            })
        );
}
 
export function setVehicletypelistSearchText(event)
{
    return {
        type      : SET_VEHICLETYPELISTCASE_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeVehicletypelistOrder(orderBy)
{
    return {
        type: CHANGE_VEHICLETYPELISTCASE_ORDER,
        orderBy
    }
}

export function toggleVehicletypelistOrderDescending()
{
    return {
        type: TOGGLE_VEHICLETYPELISTCASE_ORDER_DESCENDING
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
		dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: true});
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
			dispatch({type: CLOSE_EDIT_VEHICLETYPELISTCASE_DIALOG});
			dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: false});
			return dispatch(getVehicletypelist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditVehicletypelistDialog()
{
    return {
        type: CLOSE_EDIT_VEHICLETYPELISTCASE_DIALOG
    }
}

export function closeNewVehicletypelistDialog()
{
    return {
        type: CLOSE_NEW_VEHICLETYPELISTCASE_DIALOG
    }
}

export function openEditVehicletypelistDialog(data)
{ 
    return {
        type: OPEN_EDIT_VEHICLETYPELISTCASE_DIALOG,
        data
    }
}

export function openNewVehicletypelistDialog()
{
    return {
        type: OPEN_NEW_VEHICLETYPELISTCASE_DIALOG
    }
}

export function addVehicletypelist(vehicletype)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: true});
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
			dispatch({type: CLOSE_NEW_VEHICLETYPELISTCASE_DIALOG});
			dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: false});
			return dispatch(getVehicletypelist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_VEHICLETYPELISTCASE, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeVehicletypelist(vehicletypelistCASEId)
{
    const request = axios.delete('/api/vehicletype-app/remove-vehicletype', {data: {vehicletypeId:vehicletypelistCASEId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_VEHICLETYPELISTCASE
                    })
                ]).then(() => dispatch(getVehicletypelist()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
