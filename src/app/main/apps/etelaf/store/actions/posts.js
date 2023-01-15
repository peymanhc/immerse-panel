import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_ETELAF = '[ETELAF APP] GET ETELAF';
export const SET_ETELAF_SEARCH_TEXT = '[ETELAF APP] SET ETELAF SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/etelaf-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'etelaf',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_ETELAF,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/etelaf-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_ETELAF_SEARCH_TEXT,
        searchText: event.target.value
    }
}

