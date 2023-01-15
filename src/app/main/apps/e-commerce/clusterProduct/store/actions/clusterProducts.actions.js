import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CLUSTERPRODUCTS = '[CLUSTERPRODUCT APP] GET CLUSTERPRODUCTS';
export const GET_CATEGORIES = '[CLUSTERPRODUCT APP] GET_CATEGORIES';
export const GET_CLUSTER = '[CLUSTERPRODUCT APP] GET_CLUSTER';
export const SELECT_CLUSTER = '[CLUSTERPRODUCT APP] SELECT_CLUSTER';
export const GET_CLUSTERPRODUCT = '[CLUSTERPRODUCT APP] GET CLUSTERPRODUCT';
export const UPDATE_CLUSTERPRODUCTS = '[CLUSTERPRODUCT APP] UPDATE CLUSTERPRODUCTS';
export const SELECT_ALL_CLUSTERPRODUCTS = '[CLUSTERPRODUCTS] SELECT ALL CLUSTERPRODUCTS';
export const DESELECT_ALL_CLUSTERPRODUCTS = '[CLUSTERPRODUCTS] DESELECT ALL CLUSTERPRODUCTS';
export const TOGGLE_IN_SELECTED_CLUSTERPRODUCTS = '[CLUSTERPRODUCTS] TOGGLE IN SELECTED CLUSTERPRODUCTS';
export const SELECT_CLUSTERPRODUCTS_BY_PARAMETER = '[CLUSTERPRODUCTS] SELECT CLUSTERPRODUCTS BY PARAMETER';
export const SET_FOLDER_ON_SELECTED_CLUSTERPRODUCTS = '[CLUSTERPRODUCTS] SET FOLDER ON SELECTED CLUSTERPRODUCTS';
export const TOGGLE_LABEL_ON_SELECTED_CLUSTERPRODUCTS = '[CLUSTERPRODUCTS] TOGGLE LABEL ON SELECTED CLUSTERPRODUCTS';
export const SET_SEARCH_TEXT = '[CLUSTERPRODUCTS] SET SEARCH TEXT';

export function getClusterProducts(routeParams)
{
    const request = axios.get('/api/cluster-product-app/clusterProducts', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CLUSTERPRODUCTS,
                routeParams: routeParams,
                payload    : response.data
            })
        );
}

export function getCategories()
{
    const request = axios.get('/api/cluster-product-app/categories');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CATEGORIES,
                payload    : response.data
            })
        );
}

export function getClusterlist()
{
    const request = axios.get('/api/cluster-product-app/clusterlist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CLUSTER,
                payload    : response.data
            })
        );
}

export function selectAds(object)
{
    return {
        type      : SELECT_CLUSTER,
        payload: object,
    }
}

export function removeProducts(idList)
{
	const request = axios.delete('/api/cluster-product-app/deleteProducts', {data : {idList}});
    return (dispatch) =>
        request.then((response) => {
			dispatch(getClusterProducts());
			return dispatch(deselectAllClusterProducts());
		}).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function updateClusterProducts()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().clusterProductApp.clusterProducts;

        const request = axios.get('/api/cluster-product-app/clusterProducts', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_CLUSTERPRODUCTS,
                payload: response.data
            })
        );
    }
}

export function selectAllClusterProducts()
{
    return {
        type: SELECT_ALL_CLUSTERPRODUCTS
    }
}

export function deselectAllClusterProducts()
{
    return {
        type: DESELECT_ALL_CLUSTERPRODUCTS
    }
}

export function selectClusterProductsByParameter(parameter, value)
{
    return {
        type   : SELECT_CLUSTERPRODUCTS_BY_PARAMETER,
        payload: {
            parameter,
            value
        }
    }
}

export function toggleInSelectedClusterProducts(clusterProductId)
{
    return {
        type: TOGGLE_IN_SELECTED_CLUSTERPRODUCTS,
        clusterProductId
    }
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function setFolderOnSelectedClusterProducts(id)
{
    return (dispatch, getState) => {
        const selectedClusterProductIds = getState().clusterProductApp.clusterProducts.selectedClusterProductIds;

        const request = axios.put('/api/cluster-product-app/set-folder', {
            selectedClusterProductIds,
            folderId: id
        });

        return request.then((response) => {
                dispatch({
                    type: SET_FOLDER_ON_SELECTED_CLUSTERPRODUCTS
                });
                return dispatch(updateClusterProducts())
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    }
}

export function toggleLabelOnSelectedClusterProducts(id)
{
    return (dispatch, getState) => {
        const selectedClusterProductIds = getState().clusterProductApp.clusterProducts.selectedClusterProductIds;

        const request = axios.put('/api/cluster-product-app/toggle-label', {
            selectedClusterProductIds,
            labelId: id
        });

        return request.then((response) => {
                dispatch({
                    type: TOGGLE_LABEL_ON_SELECTED_CLUSTERPRODUCTS
                });
                return dispatch(updateClusterProducts())
            }
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    }
}
