import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_IDEA = '[IDEA APP] GET IDEA';
export const SET_IDEA_SEARCH_TEXT = '[IDEA APP] SET IDEA SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/idea-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'idea',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_IDEA,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/idea-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_IDEA_SEARCH_TEXT,
        searchText: event.target.value
    }
}

