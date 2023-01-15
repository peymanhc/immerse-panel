import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_COURSE = '[COURSE APP] GET COURSE';
export const SET_COURSE_SEARCH_TEXT = '[COURSE APP] SET COURSE SEARCH TEXT';

export function getPosts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/course-app/posts', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'course',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_COURSE,
                payload: response.data.posts,
				count: response.data.count
            })
        );
	
}

export function removePosts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/course-app/posts/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getPosts(perPage, page))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setPostsSearchText(event)
{
    return {
        type      : SET_COURSE_SEARCH_TEXT,
        searchText: event.target.value
    }
}

