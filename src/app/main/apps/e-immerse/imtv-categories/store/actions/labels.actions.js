import axios from 'axios';

export const GET_LABELS = '[IMTV CATEGORY APP] GET LABELS';

export function getLabels()
{
    const request = axios.get('/api/imtv-category-app/labels');

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
    const request = axios.post('/api/imtv-category-app/new-label', category);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );	
		
}