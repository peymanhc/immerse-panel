import axios from 'axios';

export const GET_FILTERS = '[IMTV PROPERTY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/imtv-property-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
