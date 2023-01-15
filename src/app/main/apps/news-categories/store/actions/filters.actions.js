import axios from 'axios';

export const GET_FILTERS = '[NEWS CATEGORY APP] GET FILTERS';

export function getFilters()
{
    const request = axios.get('/api/news-category-app/filters');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FILTERS,
                payload: response.data
            })
        );
}
