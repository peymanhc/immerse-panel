import axios from 'axios';

export const GET_LABELS = '[IMTV PROPERTY APP] GET LABELS';

export function getLabels()
{
    const request = axios.get('/api/imtv-property-app/labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );
}

export function addLabel(property)
{
    const request = axios.post('/api/imtv-property-app/new-label', property);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );	
		
}