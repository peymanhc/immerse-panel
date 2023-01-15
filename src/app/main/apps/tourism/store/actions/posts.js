import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_TOURISM = '[TOURISM APP] GET TOURISM';
export const SET_TOURISM_SEARCH_TEXT = '[TOURISM APP] SET TOURISM SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/tourism-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'tourism',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_TOURISM,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/tourism-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_TOURISM_SEARCH_TEXT,
        searchText: event.target.value
    }
}

