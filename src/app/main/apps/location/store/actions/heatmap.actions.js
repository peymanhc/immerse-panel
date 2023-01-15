import axios from 'axios';

export const GET_HEATMAP = '[LOCATION APP] GET HEATMAP';

export const SET_HEATMAP = '[LOCATION APP] SET HEATMAP';



export function getHeatmap()
{
    const request = axios.get('/api/location-app/heatmap');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_HEATMAP,
                payload: response.data
            })
        );
}

export function setHeatmap(data){
	return {type   : SET_HEATMAP, payload: data};
}