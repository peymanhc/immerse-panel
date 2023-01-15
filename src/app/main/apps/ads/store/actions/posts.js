import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_ADS = '[ADS APP] GET ADS';
export const SET_ADS_SEARCH_TEXT = '[ADS APP] SET ADS SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/ads-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'ads',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_ADS,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/ads-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_ADS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

