import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_CAMERA = '[CAMERA APP] GET CAMERA';
export const SET_CAMERA_SEARCH_TEXT = '[CAMERA APP] SET CAMERA SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/camera-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'camera',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_CAMERA,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/camera-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_CAMERA_SEARCH_TEXT,
        searchText: event.target.value
    }
}

