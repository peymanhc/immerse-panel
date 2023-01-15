import axios from 'axios';
export const GET_LOCATIONS = '[LOCATION APP] GET LOCATIONS';

export const SET_LOCATIONS = '[LOCATION APP] SET LOCATIONS';

export const ZOOM_LOCATIONS = '[LOCATION APP] ZOOM LOCATIONS';

export const ID_LOCATIONS = '[LOCATION APP] ID LOCATIONS';

export function getLocations()
{
    const request = axios.get('/api/location-app/locations');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LOCATIONS,
                payload: response.data
            })
        );
}

export function setLocations(data)
{
	return	{type: SET_LOCATIONS, payload: data};
}

export function zoomLocations(data)
{
	return	{type: ZOOM_LOCATIONS, payload: data};
}

export function idLocations(data)
{
	return	{type: ID_LOCATIONS, payload: data};
}