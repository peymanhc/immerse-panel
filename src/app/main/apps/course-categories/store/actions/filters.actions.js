import axios from 'axios';

export const GET_FILTERS = '[COURSE CATEGORY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/course-category-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
