import axios from 'axios';
//import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_PANELS = '[PANEL APP] GET PANELS';
export const GET_LABELS = '[PANEL APP] GET LABELS';
export const UPDATE_PANELS  = '[PANEL APP] UPDATE PANELS';
export const OPEN_NEW_PANELS_DIALOG = '[PANEL APP] OPEN NEW PANELS DIALOG';
export const CLOSE_NEW_PANELS_DIALOG = '[PANEL APP] CLOSE NEW PANELS DIALOG';
export const OPEN_EDIT_PANELS_DIALOG = '[PANEL APP] OPEN EDIT PANELS DIALOG';
export const CLOSE_EDIT_PANELS_DIALOG = '[PANEL APP] CLOSE EDIT PANELS DIALOG';
export const SET_PANELS_SEARCH_TEXT = '[PANEL APP] SET PANELS SEARCH TEXT';
export const TOGGLE_PANELS_ORDER_DESCENDING = '[PANEL APP] TOGGLE PANELS ORDER DESCENDING';
export const CHANGE_PANELS_ORDER = '[PANEL APP] CHANGE PANELS ORDER';
export const TOGGLE_STARRED = '[PANEL APP] TOGGLE PANELS STARRED';
export const TOGGLE_IMPORTANT = '[PANEL APP] TOGGLE PANELS IMPORTANT';
export const TOGGLE_ENABLE = '[PANEL APP] TOGGLE PANELS ENABLE';
export const TOGGLE_DISABLE = '[PANEL APP] TOGGLE PANELS DISABLE';
export const ADD_PANELS = '[PANEL APP] ADD PANELS';
export const REMOVE_PANELS = '[PANEL APP] REMOVE PANELS';
export const WAIT_PANELS = '[PANEL APP] ADD LOADING PANELS';
export const GET_TYPES = '[PANEL APP] GET TYPES';

export function getData(params){
	return (dispatch) => dispatch(getLabels()).then(() => dispatch(getPanels(params)));
}

export function getPanels(params)
{
    const request = axios.get('/api/panel-app/getPanels', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   		: GET_PANELS, 
                payload		: response.data,
				routeParams	: params,
            })
        );
}

export function getLabels()
{
    const request = axios.get('/api/panel-app/getLabels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS, 
                payload: response.data
            })
        );
}
 
export function setPanelsSearchText(event)
{
    return {
        type      : SET_PANELS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changePanelsOrder(orderBy)
{
    return {
        type: CHANGE_PANELS_ORDER,
        orderBy
    }
}

export function togglePanelsOrderDescending()
{
    return {
        type: TOGGLE_PANELS_ORDER_DESCENDING
    }
}

export function togglePanelsStarred(panel)
{
    const newPanels = {
        ...panel,
        starred: !panel.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updatePanels(newPanels)))
    )
}

export function togglePanelsImportant(panel)
{
    const newPanels = {
        ...panel,
        important: !panel.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updatePanels(newPanels)))
    )
}

export function updatePanels(panel)
{	
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_PANELS, payload: true});
		const {routeParams} = getState().panelsApp.panels;	
		const request = axios.put('/api/panel-app/update-panel', {...panel, ...routeParams});		 
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_PANELS_DIALOG});
			dispatch({type: WAIT_PANELS, payload: false});		
				
			return dispatch(getPanels(routeParams))	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_PANELS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditPanelsDialog()
{
    return {
        type: CLOSE_EDIT_PANELS_DIALOG
    }
}

export function closeNewPanelsDialog()
{
    return {
        type: CLOSE_NEW_PANELS_DIALOG
    }
}

export function openEditPanelsDialog(data)
{ 
    return {
        type: OPEN_EDIT_PANELS_DIALOG,
        data
    }
}

export function openNewPanelsDialog()
{
    return {
        type: OPEN_NEW_PANELS_DIALOG
    }
}

export function addPanels(panel)
{
 
    return async (dispatch) => {
		
		dispatch({type: WAIT_PANELS, payload: true});
 		
		const request = axios.post('/api/panel-app/new-panel', panel);
		
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_PANELS_DIALOG});
			dispatch({type: WAIT_PANELS, payload: false});
			return dispatch(getPanels())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_PANELS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
		
	}	
}

export function removePanels(panelsId)
{
    const request = axios.delete('/api/panel-app/remove-panel', {data: {panelId:panelsId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_PANELS
                    })
                ]).then(() => dispatch(getPanels()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
