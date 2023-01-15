import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_GALLERY = '[GALLERY APP] GET GALLERY';
export const SET_GALLERY_SEARCH_TEXT = '[GALLERY APP] SET GALLERY SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/gallery-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'gallery',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_GALLERY,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/gallery-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_GALLERY_SEARCH_TEXT,
        searchText: event.target.value
    }
}

