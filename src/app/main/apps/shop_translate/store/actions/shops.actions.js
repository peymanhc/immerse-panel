import axios from 'axios';
//import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_SHOPS = '[SHOP APP] GET SHOPS';
export const GET_LABELS = '[SHOP APP] GET LABELS';
export const UPDATE_SHOPS  = '[SHOP APP] UPDATE SHOPS';
export const OPEN_NEW_SHOPS_DIALOG = '[SHOP APP] OPEN NEW SHOPS DIALOG';
export const CLOSE_NEW_SHOPS_DIALOG = '[SHOP APP] CLOSE NEW SHOPS DIALOG';
export const OPEN_EDIT_SHOPS_DIALOG = '[SHOP APP] OPEN EDIT SHOPS DIALOG';
export const CLOSE_EDIT_SHOPS_DIALOG = '[SHOP APP] CLOSE EDIT SHOPS DIALOG';
export const SET_SHOPS_SEARCH_TEXT = '[SHOP APP] SET SHOPS SEARCH TEXT';
export const TOGGLE_SHOPS_ORDER_DESCENDING = '[SHOP APP] TOGGLE SHOPS ORDER DESCENDING';
export const CHANGE_SHOPS_ORDER = '[SHOP APP] CHANGE SHOPS ORDER';
export const TOGGLE_STARRED = '[SHOP APP] TOGGLE SHOPS STARRED';
export const TOGGLE_IMPORTANT = '[SHOP APP] TOGGLE SHOPS IMPORTANT';
export const TOGGLE_ENABLE = '[SHOP APP] TOGGLE SHOPS ENABLE';
export const TOGGLE_DISABLE = '[SHOP APP] TOGGLE SHOPS DISABLE';
export const ADD_SHOPS = '[SHOP APP] ADD SHOPS';
export const REMOVE_SHOPS = '[SHOP APP] REMOVE SHOPS';
export const WAIT_SHOPS = '[SHOP APP] ADD LOADING SHOPS';
export const GET_TYPES = '[SHOP APP] GET TYPES';

export function getData(params){
	return (dispatch) => dispatch(getLabels()).then(() => dispatch(getShops(params)));
}

export function getShops(params)
{
    const request = axios.get('/api/shop-app/getShops', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   		: GET_SHOPS, 
                payload		: response.data,
				routeParams	: params,
            })
        );
}

export function getLabels()
{
    const request = axios.get('/api/shop-app/getLabels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS, 
                payload: response.data
            })
        );
}
 
export function setShopsSearchText(event)
{
    return {
        type      : SET_SHOPS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeShopsOrder(orderBy)
{
    return {
        type: CHANGE_SHOPS_ORDER,
        orderBy
    }
}

export function toggleShopsOrderDescending()
{
    return {
        type: TOGGLE_SHOPS_ORDER_DESCENDING
    }
}

export function toggleShopsStarred(shop)
{
    const newShops = {
        ...shop,
        starred: !shop.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateShops(newShops)))
    )
}

export function toggleShopsImportant(shop)
{
    const newShops = {
        ...shop,
        important: !shop.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateShops(newShops)))
    )
}

export function updateShops(shop)
{	
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_SHOPS, payload: true});
		const {routeParams} = getState().shopsApp.shops;	
		const request = axios.put('/api/shop-app/update-shop', {...shop, ...routeParams});		 
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_SHOPS_DIALOG});
			dispatch({type: WAIT_SHOPS, payload: false});		
				
			return dispatch(getShops(routeParams))	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_SHOPS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditShopsDialog()
{
    return {
        type: CLOSE_EDIT_SHOPS_DIALOG
    }
}

export function closeNewShopsDialog()
{
    return {
        type: CLOSE_NEW_SHOPS_DIALOG
    }
}

export function openEditShopsDialog(data)
{ 
    return {
        type: OPEN_EDIT_SHOPS_DIALOG,
        data
    }
}

export function openNewShopsDialog()
{
    return {
        type: OPEN_NEW_SHOPS_DIALOG
    }
}

export function addShops(shop)
{
 
    return async (dispatch) => {
		
		dispatch({type: WAIT_SHOPS, payload: true});
 		
		const request = axios.post('/api/shop-app/new-shop', shop);
		
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_SHOPS_DIALOG});
			dispatch({type: WAIT_SHOPS, payload: false});
			return dispatch(getShops())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_SHOPS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
		
	}	
}

export function removeShops(shopsId)
{
    const request = axios.delete('/api/shop-app/remove-shop', {data: {shopId:shopsId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_SHOPS
                    })
                ]).then(() => dispatch(getShops()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
