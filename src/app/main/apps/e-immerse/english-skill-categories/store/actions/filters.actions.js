import axios from 'axios';

export const GET_FILTERS = '[ENGLISH SKILL CATEGORY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/english-skill-category-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
