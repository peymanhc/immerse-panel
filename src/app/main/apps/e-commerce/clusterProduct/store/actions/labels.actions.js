import axios from 'axios';

export const GET_LABELS = '[CLUSTERPRODUCT APP] GET LABELS';

export function getLabels()
{
    const request = axios.get('/api/clusterProduct-app/labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABELS,
                payload: response.data
            })
        );
}

