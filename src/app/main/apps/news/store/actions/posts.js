import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_NEWS = '[NEWS APP] GET NEWS';
export const SET_NEWS_SEARCH_TEXT = '[NEWS APP] SET NEWS SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/news-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'news',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_NEWS,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/news-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_NEWS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

