import axios from 'axios';

export const GET_FILTERS = '[ACC CATEGORY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/acc-category-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
