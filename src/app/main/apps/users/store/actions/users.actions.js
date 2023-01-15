import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_USERS = '[USERS APP] GET USERS';
export const OPEN_USERS_DIALOG = '[USERS APP] OPEN USERS DIALOG';
export const CLOSE_USERS_DIALOG = '[USERS APP] CLOSE USERS DIALOG';
export const SELECT_USER = '[USERS APP] SELECT USER';

export const SET_SEARCH_TEXT = '[USERS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_USERS = '[USERS APP] TOGGLE IN SELECTED USERS';
export const SELECT_ALL_USERS = '[USERS APP] SELECT ALL USERS';
export const DESELECT_ALL_USERS = '[USERS APP] DESELECT ALL USERS';
export const OPEN_NEW_USER_DIALOG = '[USERS APP] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[USERS APP] CLOSE NEW USER DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[USERS APP] OPEN EDIT USER DIALOG';
export const CLOSE_EDIT_USER_DIALOG = '[USERS APP] CLOSE EDIT USER DIALOG';
export const ADD_USER = '[USERS APP] ADD USER';
export const UPDATE_USER = '[USERS APP] UPDATE USER';
export const REMOVE_USER = '[USERS APP] REMOVE USER';
export const REMOVE_USERS = '[USERS APP] REMOVE USERS';
export const TOGGLE_STARRED_USER = '[USERS APP] TOGGLE STARRED USER';
export const TOGGLE_STARRED_USERS = '[USERS APP] TOGGLE STARRED USERS';
export const SET_USERS_STARRED = '[USERS APP] SET USERS STARRED ';
export const GET_USER_DATA = '[USERS APP] GET USER DATA';


export function getUserData()
{ 
    const request = axios.get('/api/usermanager-app/user');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })
        );
}
export function getUsers(routeParams)
{
    const request = axios.get('/api/usermanager-app/users', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USERS,
                payload: response.data,
                routeParams
            })
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedUsers(userId)
{
    return {
        type: TOGGLE_IN_SELECTED_USERS,
        userId
    }
}


export function selectAllUsers()
{
    return {
        type: SELECT_ALL_USERS
    }
}

export function deSelectAllUsers()
{
    return {
        type: DESELECT_ALL_USERS
    }
}


export function openNewUserDialog()
{
    return {
        type: OPEN_NEW_USER_DIALOG
    }
}

export function closeNewUserDialog()
{
    return {
        type: CLOSE_NEW_USER_DIALOG
    }
}

export function openEditUserDialog(data)
{
    return {
        type: OPEN_EDIT_USER_DIALOG,
        data
    }
}

export function closeEditUserDialog()
{
    return {
        type: CLOSE_EDIT_USER_DIALOG
    }
}

export function addUser(newUser)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.post('/api/usermanager-app/create-user', {
            user:newUser
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function updateUser(user)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.put('/api/usermanager-app/save-user', {
            user
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function removeUser(userId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.delete('/api/usermanager-app/remove-users', {
            data:{
				userIds:[userId]
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USER
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}


export function removeUsers(userIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.delete('/api/usermanager-app/remove-users', {
            data:{
				userIds
			}
        }).catch(err => dispatch(showMessage({message: 'Access Denied'})));

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USERS
                }),
                dispatch({
                    type: DESELECT_ALL_USERS
                })
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredUser(userId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().UsersApp.users;

        const request = axios.put('/api/usermanager-app/toggle-starred-users', {
            userIds:[userId]
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_USER
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredUsers(userIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.put('/api/usermanager-app/toggle-starred-users', {
            userIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_USERS
                }),
                dispatch({
                    type: DESELECT_ALL_USERS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setUsersStarred(userIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.put('/api/usermanager-app/set-users-starred', {
            userIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_USERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_USERS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setUsersUnstarred(userIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().UsersApp.users;

        const request = axios.put('/api/usermanager-app/set-users-unstarred', {
            userIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_USERS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_USERS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getUsers(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}




//export const getUsers = () => {
//    const request = axios.get('/api/usermanager-app/users');
//
//    return (dispatch) =>
//        request.then((response) =>
//            dispatch({
//                type       : GET_USERS,
//                payload    : response.data
//            })
//        );	
//}

//export const saveUser = (user) => { 
//    const request = axios.post('/api/usermanager-app/save-user', {user});
//
//    return (dispatch) =>
//        request.then((response) =>
//            dispatch(getUsers())
//        );	
//}

//export const removeUser = (userIds) => { 
//    const request = axios.post('/api/usermanager-app/remove-users', {userIds});
//
//    return (dispatch) =>
//        request.then((response) =>
//            dispatch(getUsers())
//        );	
//}

export function openUserDialog()
{
    return {
        type: OPEN_USERS_DIALOG
    }
}

export function closeUserDialog()
{
    return {
        type: CLOSE_USERS_DIALOG
    }
}

export function selectUser(value)
{
    return {
        type: SELECT_USER,
		payload: value
    }	
}