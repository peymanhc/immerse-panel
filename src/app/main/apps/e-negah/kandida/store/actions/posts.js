import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_KANDIDA = '[KANDIDA APP] GET KANDIDA';
export const SET_KANDIDA_SEARCH_TEXT = '[KANDIDA APP] SET KANDIDA SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/kandida-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'kandida',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_KANDIDA,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/kandida-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_KANDIDA_SEARCH_TEXT,
        searchText: event.target.value
    }
}

