import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

 
export const GET_ADDRESSES = '[ADDRESS APP] GET ADDRESSES';
export const UPDATE_ADDRESSES = '[ADDRESS APP] UPDATE ADDRESSES';
export const TOGGLE_STARRED = '[ADDRESS APP] TOGGLE STARRED';
export const TOGGLE_COMPLETED = '[ADDRESS APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[ADDRESS APP] TOGGLE IMPORTANT';
export const UPDATE_ADDRESS = '[ADDRESS APP] UPDATE ADDRESS';
export const ADD_ADDRESS = '[ADDRESS APP] ADD ADDRESS';
export const REMOVE_ADDRESS = '[ADDRESS APP] REMOVE ADDRESS';
export const SET_SEARCH_TEXT = '[ADDRESS APP] SET SEARCH TEXT';
export const OPEN_NEW_ADDRESS_DIALOG = '[ADDRESS APP] OPEN NEW ADDRESS DIALOG';
export const CLOSE_NEW_ADDRESS_DIALOG = '[ADDRESS APP] CLOSE NEW ADDRESS DIALOG';
export const OPEN_EDIT_ADDRESS_DIALOG = '[ADDRESS APP] OPEN EDIT ADDRESS DIALOG';
export const CLOSE_EDIT_ADDRESS_DIALOG = '[ADDRESS APP] CLOSE EDIT ADDRESS DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[ADDRESS APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[ADDRESS APP] CHANGE ORDER';
export const GET_USERS = '[ADDRESS APP] GET USERS';
export const GET_CITIES = '[ADDRESS APP] GET CITIES';
export const WAIT_ADDRESS = '[ADDRESS APP] WAIT ADDRESS';

export function getData(match)
{
    return dispatch => dispatch(getAddresses(match));
}

export function getAddresses(match)
{
    const request = axios.get('/api/address-app/addresses', {
        params: match.params
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_ADDRESSES,
                routeParams: match.params,
                payload    : response.data
            })
        );
}

export function getUsers()
{
    const request = axios.get('/api/address-app/users');

    return (dispatch) =>
        request.then((response) =>{ 
            return dispatch({
                type       : GET_USERS,
                payload    : response.data
            })
		}
        );
}

export function getCities()
{
    const request = axios.get('/api/address-app/cities');

    return (dispatch) =>
        request.then((response) =>{ 
            return dispatch({
                type       : GET_CITIES,
                payload    : response.data
            })
		}
        );
}

export function updateAddresses()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().addressApp.addresses;

        const request = axios.get('/api/address-app/addresses', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_ADDRESSES,
                payload: response.data
            })
        );
    }
}

export function toggleCompleted(address)
{
    const newAddress = {
        ...address,
        completed: !address.completed
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_COMPLETED})
        ]).then(() => dispatch(updateAddress(newAddress)))
    )
}

export function toggleStarred(address)
{
    const newAddress = {
        ...address,
        starred: !address.starred
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateAddress(newAddress)))
    )
}

export function toggleImportant(address)
{
    const newAddress = {
        ...address,
        important: !address.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateAddress(newAddress)))
    )
}

export function updateAddress(address)
{
    

    return async (dispatch) => {
		
		dispatch({type: WAIT_ADDRESS, payload: true});
		const {imgSrc} = address; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "address", "put"); 
				address["imgSrc"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				address["imgSrc"] = "";
			}
		}	
		const request = axios.put('/api/address-app/update-address', address);	
        return request.then((response) => {
				dispatch({type: WAIT_ADDRESS, payload: false});
				dispatch({type: CLOSE_EDIT_ADDRESS_DIALOG});
                Promise.all([
                    dispatch({
                        type   : UPDATE_ADDRESS,
                        payload: response.data
                    })
                ]).then(() => dispatch(updateAddresses()))
            }
        ).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_ADDRESS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}
}

export function openNewAddressDialog()
{
    return {
        type: OPEN_NEW_ADDRESS_DIALOG
    }
}

export function closeNewAddressDialog()
{
    return {
        type: CLOSE_NEW_ADDRESS_DIALOG
    }
}

export function openEditAddressDialog(data)
{
    return {
        type: OPEN_EDIT_ADDRESS_DIALOG,
        data
    }
}

export function closeEditAddressDialog()
{
    return {
        type: CLOSE_EDIT_ADDRESS_DIALOG
    }
}

export function addAddress(address)
{
    

    return async (dispatch) => {
		
		dispatch({type: WAIT_ADDRESS, payload: true});
		const {imgSrc} = address; 
		if(typeof imgSrc === "object"){
			try{
				const img = await uploadImage(imgSrc.file, "address", "post");
				address["imgSrc"] = img.url;				
			}
			catch(err){
				address["imgSrc"] = "";
			}
		}	
		const request = axios.post('/api/address-app/new-address', address);
        return request.then((response) => {
			dispatch({type: WAIT_ADDRESS, payload: false});
			dispatch({type: CLOSE_NEW_ADDRESS_DIALOG});
                return Promise.all([
                    dispatch({
                        type: ADD_ADDRESS
                    })
                ]).then(() => dispatch(updateAddresses()))
			}
        ).catch((err) => {
			//console.log(err);
			dispatch({type: WAIT_ADDRESS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}
}

export function removeAddress(addressId)
{
    const request = axios.delete('/api/address-app/remove-addresses', {data:{selectedAddressIds:addressId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_ADDRESS
                    })
                ]).then(() => dispatch(updateAddresses()))
            )
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function toggleOrderDescending()
{
    return {
        type: TOGGLE_ORDER_DESCENDING
    }
}

export function changeOrder(orderBy)
{
    return {
        type: CHANGE_ORDER,
        orderBy
    }
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "address_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/address-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/address-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};