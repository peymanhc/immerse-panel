import axios from 'axios';
//import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_STORES = '[STORE APP] GET STORES';
export const GET_LABELS = '[STORE APP] GET LABELS';
export const UPDATE_STORES  = '[STORE APP] UPDATE STORES';
export const OPEN_NEW_STORES_DIALOG = '[STORE APP] OPEN NEW STORES DIALOG';
export const CLOSE_NEW_STORES_DIALOG = '[STORE APP] CLOSE NEW STORES DIALOG';
export const OPEN_EDIT_STORES_DIALOG = '[STORE APP] OPEN EDIT STORES DIALOG';
export const CLOSE_EDIT_STORES_DIALOG = '[STORE APP] CLOSE EDIT STORES DIALOG';
export const SET_STORES_SEARCH_TEXT = '[STORE APP] SET STORES SEARCH TEXT';
export const TOGGLE_STORES_ORDER_DESCENDING = '[STORE APP] TOGGLE STORES ORDER DESCENDING';
export const CHANGE_STORES_ORDER = '[STORE APP] CHANGE STORES ORDER';
export const TOGGLE_STARRED = '[STORE APP] TOGGLE STORES STARRED';
export const TOGGLE_IMPORTANT = '[STORE APP] TOGGLE STORES IMPORTANT';
export const TOGGLE_ENABLE = '[STORE APP] TOGGLE STORES ENABLE';
export const TOGGLE_DISABLE = '[STORE APP] TOGGLE STORES DISABLE';
export const ADD_STORES = '[STORE APP] ADD STORES';
export const REMOVE_STORES = '[STORE APP] REMOVE STORES';
export const WAIT_STORES = '[STORE APP] ADD LOADING STORES';
export const GET_TYPES = '[STORE APP] GET TYPES';

export function getData(params){
	return (dispatch) => dispatch(getLabels()).then(() => dispatch(getStores1(params)));
}

export function getStores1(params)
{
    const request = axios.get('/api/store-app/getStores1', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   		: GET_STORES, 
                payload		: response.data,
				routeParams	: params,
            })
        );
}

export function getLabels()
{
    const request = axios.get('/api/store-app/getLabels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS, 
                payload: response.data
            })
        );
}
 
export function setStoresSearchText(event)
{
    return {
        type      : SET_STORES_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeStoresOrder(orderBy)
{
    return {
        type: CHANGE_STORES_ORDER,
        orderBy
    }
}

export function toggleStoresOrderDescending()
{
    return {
        type: TOGGLE_STORES_ORDER_DESCENDING
    }
}



export function updateStores(store)
{	
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_STORES, payload: true});
		const {routeParams} = getState().storesApp.stores;	
		const request = axios.put('/api/store-app/update-store', {...store, ...routeParams});		 
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_STORES_DIALOG});
			dispatch({type: WAIT_STORES, payload: false});		
				
			return dispatch(getStores1(routeParams))	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_STORES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditStoresDialog()
{
    return {
        type: CLOSE_EDIT_STORES_DIALOG
    }
}

export function closeNewStoresDialog()
{
    return {
        type: CLOSE_NEW_STORES_DIALOG
    }
}

export function openEditStoresDialog(data)
{ 
    return {
        type: OPEN_EDIT_STORES_DIALOG,
        data
    }
}

export function openNewStoresDialog()
{
    return {
        type: OPEN_NEW_STORES_DIALOG
    }
}

export function addStores(store)
{
 
    return async (dispatch) => {
		
		dispatch({type: WAIT_STORES, payload: true});
 		
		const request = axios.post('/api/store-app/new-store', store);
		
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_STORES_DIALOG});
			dispatch({type: WAIT_STORES, payload: false});
			return dispatch(getStores1())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_STORES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
		
	}	
}

export function removeStores(storesId)
{
    const request = axios.delete('/api/store-app/remove-store', {data: {storeId:storesId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_STORES
                    })
                ]).then(() => dispatch(getStores1()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
