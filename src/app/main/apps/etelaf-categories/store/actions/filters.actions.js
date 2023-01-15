import axios from 'axios';

export const GET_FILTERS = '[ETELAF CATEGORY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/etelaf-category-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
