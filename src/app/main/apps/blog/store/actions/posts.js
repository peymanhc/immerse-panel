import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_BLOG = '[BLOG APP] GET BLOG';
export const SET_BLOG_SEARCH_TEXT = '[BLOG APP] SET BLOG SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/blog-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'blog',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_BLOG,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/blog-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_BLOG_SEARCH_TEXT,
        searchText: event.target.value
    }
}

