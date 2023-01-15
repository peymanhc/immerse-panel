import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_BOOKSTORE = '[BOOKSTORE APP] GET BOOKSTORE';
export const SET_BOOKSTORE_SEARCH_TEXT = '[BOOKSTORE APP] SET BOOKSTORE SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/bookstore-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'bookstore',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_BOOKSTORE,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/bookstore-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_BOOKSTORE_SEARCH_TEXT,
        searchText: event.target.value
    }
}

