import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_NOTEBOOK = '[NOTEBOOK APP] GET NOTEBOOK';
export const SET_NOTEBOOK_SEARCH_TEXT = '[NOTEBOOK APP] SET NOTEBOOK SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/notebook-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'notebook',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_NOTEBOOK,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/notebook-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_NOTEBOOK_SEARCH_TEXT,
        searchText: event.target.value
    }
}

