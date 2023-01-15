import axios from 'axios';

export const GET_USER_DATA = '[CHAT APP] GET USER DATA';
export const UPDATE_USER_DATA = '[CHAT APP] UPDATE USER DATA';


export function getUserData()
{
    const request = axios.get('/api/chat/user');

    return (dispatch) =>
        request.then((response) =>{
            return dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })			
        }).catch(err =>             
			dispatch({
                type   : GET_USER_DATA,
                payload: {}
            }));
}

export function updateUserData(newData)
{
    const request = axios.put('/api/chat/user/data', newData);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : UPDATE_USER_DATA,
                payload: response.data
            })
        );
}
