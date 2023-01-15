import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_GATEWAYS = '[GATEWAY APP] GET GATEWAYS';
export const UPDATE_GATEWAYS  = '[GATEWAY APP] UPDATE GATEWAYS';
export const OPEN_NEW_GATEWAYS_DIALOG = '[GATEWAY APP] OPEN NEW GATEWAYS DIALOG';
export const CLOSE_NEW_GATEWAYS_DIALOG = '[GATEWAY APP] CLOSE NEW GATEWAYS DIALOG';
export const OPEN_EDIT_GATEWAYS_DIALOG = '[GATEWAY APP] OPEN EDIT GATEWAYS DIALOG';
export const CLOSE_EDIT_GATEWAYS_DIALOG = '[GATEWAY APP] CLOSE EDIT GATEWAYS DIALOG';
export const SET_GATEWAYS_SEARCH_TEXT = '[GATEWAY APP] SET GATEWAYS SEARCH TEXT';
export const TOGGLE_GATEWAYS_ORDER_DESCENDING = '[GATEWAY APP] TOGGLE GATEWAYS ORDER DESCENDING';
export const CHANGE_GATEWAYS_ORDER = '[GATEWAY APP] CHANGE GATEWAYS ORDER';
export const TOGGLE_STARRED = '[GATEWAY APP] TOGGLE GATEWAYS STARRED';
export const TOGGLE_IMPORTANT = '[GATEWAY APP] TOGGLE GATEWAYS IMPORTANT';
export const TOGGLE_ENABLE = '[GATEWAY APP] TOGGLE GATEWAYS ENABLE';
export const TOGGLE_DISABLE = '[GATEWAY APP] TOGGLE GATEWAYS DISABLE';
export const ADD_GATEWAYS = '[GATEWAY APP] ADD GATEWAYS';
export const REMOVE_GATEWAYS = '[GATEWAY APP] REMOVE GATEWAYS';
export const WAIT_GATEWAYS = '[GATEWAY APP] ADD LOADING GATEWAYS';
export const GET_TYPES = '[GATEWAY APP] GET TYPES';


export function getGateways()
{
    const request = axios.get('/api/gateway-app/getGateways');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_GATEWAYS,
                payload: response.data
            })
        );
}
 
export function setGatewaysSearchText(event)
{
    return {
        type      : SET_GATEWAYS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeGatewaysOrder(orderBy)
{
    return {
        type: CHANGE_GATEWAYS_ORDER,
        orderBy
    }
}

export function toggleGatewaysOrderDescending()
{
    return {
        type: TOGGLE_GATEWAYS_ORDER_DESCENDING
    }
}

export function toggleGatewaysStarred(gateway)
{
    const newGateways = {
        ...gateway,
        starred: !gateway.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateGateways(newGateways)))
    )
}

export function toggleGatewaysImportant(gateway)
{
    const newGateways = {
        ...gateway,
        important: !gateway.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateGateways(newGateways)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "gateway_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/gateway-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/gateway-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateGateways(gateway)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_GATEWAYS, payload: true});
		const {image_full, image_mobile, image_classic} = gateway; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "gateway", "put"); 
				gateway["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				gateway["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "gateway", "put"); 
				gateway["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				gateway["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "gateway", "put"); 
				gateway["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				gateway["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/gateway-app/update-gateway', gateway);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_GATEWAYS_DIALOG});
			dispatch({type: WAIT_GATEWAYS, payload: false});
			return dispatch(getGateways())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_GATEWAYS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditGatewaysDialog()
{
    return {
        type: CLOSE_EDIT_GATEWAYS_DIALOG
    }
}

export function closeNewGatewaysDialog()
{
    return {
        type: CLOSE_NEW_GATEWAYS_DIALOG
    }
}

export function openEditGatewaysDialog(data)
{ 
    return {
        type: OPEN_EDIT_GATEWAYS_DIALOG,
        data
    }
}

export function openNewGatewaysDialog()
{
    return {
        type: OPEN_NEW_GATEWAYS_DIALOG
    }
}

export function addGateways(gateway)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_GATEWAYS, payload: true});
		const {image_full, image_mobile, image_classic} = gateway; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "gateway", "post"); 
				gateway["image_full"] = img.url;				
			}
			catch(err){ 
				gateway["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "gateway", "post"); 
				gateway["image_mobile"] = img.url;				
			}
			catch(err){ 
				gateway["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "gateway", "post"); 
				gateway["image_classic"] = img.url;				
			}
			catch(err){ 
				gateway["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/gateway-app/new-gateway', gateway);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_GATEWAYS_DIALOG});
			dispatch({type: WAIT_GATEWAYS, payload: false});
			return dispatch(getGateways())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_GATEWAYS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeGateways(gatewaysId)
{
    const request = axios.delete('/api/gateway-app/remove-gateway', {data: {gatewayId:gatewaysId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_GATEWAYS
                    })
                ]).then(() => dispatch(getGateways()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
