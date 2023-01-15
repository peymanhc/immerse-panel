import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_MASTERS = '[MASTER APP] GET MASTERS';
export const SET_MASTERS_SEARCH_TEXT = '[MASTER APP] SET MASTERS SEARCH TEXT';

export function getMasters()
{
    const request = axios.get('/api/master/masters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTERS,
                payload: response.data
            })
        );
}

export function setMastersSearchText(event)
{
    return {
        type      : SET_MASTERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function removeMasters(idList)
{
	const request = axios.delete('/api/master/remove', {data : {idList}});
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTERS,
                payload: response.data,
            })
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}