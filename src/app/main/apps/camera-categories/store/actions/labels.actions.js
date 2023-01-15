import axios from 'axios';

export const GET_LABELS = '[BLOG CATEGORY APP] GET LABELS';

export function getLabels()
{
    const request = axios.get('/api/camera-category-app/labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );
}

export function addLabel(category)
{
    const request = axios.post('/api/camera-category-app/new-label', category);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );	
		
}
