import axios from 'axios';

export const GET_FOLDERS = '[CATEGORY APP] GET FOLDERS';

export function getFolders()
{
    const request = axios.get('/api/category-app/folders');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FOLDERS,
                payload: response.data
            })
        );
}
