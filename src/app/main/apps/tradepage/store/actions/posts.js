import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_TRADEPAGE = '[TRADEPAGE APP] GET TRADEPAGE';
export const SET_TRADEPAGE_SEARCH_TEXT = '[TRADEPAGE APP] SET TRADEPAGE SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/tradepage-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'tradepage',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_TRADEPAGE,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/tradepage-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_TRADEPAGE_SEARCH_TEXT,
        searchText: event.target.value
    }
}

