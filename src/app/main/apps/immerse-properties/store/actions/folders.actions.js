import axios from 'axios';

export const GET_FOLDERS = '[IMMERSE PROPERTY APP] GET FOLDERS';

export function getFolders()
{
    const request = axios.get('/api/immerse-property-app/folders');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FOLDERS,
                payload: response.data
            })
        );
}
