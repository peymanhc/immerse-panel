import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_ROLES = '[USERS APP] GET ROLES';
export const OPEN_ROLE_DIALOG = '[USERS APP] OPEN ROLE DIALOG';
export const CLOSE_ROLE_DIALOG = '[USERS APP] CLOSE ROLE DIALOG';
export const SELECT_ROLE = '[USERS APP] SELECT ROLE';

export const SET_SEARCH_TEXT = '[USERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_ROLES = '[USERS APP] TOGGLE IN SELECTED ROLES';
export const SELECT_ALL_ROLES = '[USERS APP] SELECT ALL ROLES';
export const DESELECT_ALL_ROLES = '[USERS APP] DESELECT ALL ROLES';
export const OPEN_NEW_ROLE_DIALOG = '[USERS APP] OPEN NEW ROLE DIALOG';
export const CLOSE_NEW_ROLE_DIALOG = '[USERS APP] CLOSE NEW ROLE DIALOG';
export const OPEN_EDIT_ROLE_DIALOG = '[USERS APP] OPEN EDIT ROLE DIALOG';
export const CLOSE_EDIT_ROLE_DIALOG = '[USERS APP] CLOSE EDIT ROLE DIALOG';
export const ADD_ROLE = '[USERS APP] ADD ROLE';
export const UPDATE_ROLE = '[USERS APP] UPDATE ROLE';
export const REMOVE_ROLE = '[USERS APP] REMOVE ROLE';
export const REMOVE_ROLES = '[USERS APP] REMOVE ROLES';
export const GET_ROUTES = '[USERS APP] GET ROUTES';



export function getRoles()
{
    const request = axios.get('/api/usermanager-app/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLES,
                payload: response.data,
            })
        );
}

export function getRoutes()
{
    const request = axios.get('/api/usermanager-app/routes');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROUTES,
                payload: response.data,
            })
        );
}

export function addRole(newRole)
{
    return (dispatch, getState) => {

        const request = axios.post('/api/usermanager-app/create-role', {
            role:newRole
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_ROLE
                })
            ]).then(() => dispatch(getRoles()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function updateRole(role)
{
    return (dispatch, getState) => {

        const request = axios.put('/api/usermanager-app/save-role', {
            role
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_ROLE
                })
            ]).then(() => dispatch(getRoles()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function removeRole(id, name)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/usermanager-app/remove-role', {
            data:{
				roleName:name,
				roleId  :id,
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ROLE
                })
            ]).then(() => dispatch(getRoles()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}


export function removeRoles(roles)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/usermanager-app/remove-roles', {
            data:{
				roles
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ROLES
                }),
                dispatch({
                    type: DESELECT_ALL_ROLES
                })
            ]).then(() => dispatch(getRoles()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedRoles(roleId)
{
    return {
        type: TOGGLE_IN_SELECTED_ROLES,
        roleId
    }
}


export function selectAllRoles()
{
    return {
        type: SELECT_ALL_ROLES
    }
}

export function deSelectAllRoles()
{
    return {
        type: DESELECT_ALL_ROLES
    }
}


export function openNewRoleDialog()
{
    return {
        type: OPEN_NEW_ROLE_DIALOG
    }
}

export function closeNewRoleDialog()
{
    return {
        type: CLOSE_NEW_ROLE_DIALOG
    }
}

export function openEditRoleDialog(data)
{
    return {
        type: OPEN_EDIT_ROLE_DIALOG,
        data
    }
}

export function closeEditRoleDialog()
{
    return {
        type: CLOSE_EDIT_ROLE_DIALOG
    }
}
