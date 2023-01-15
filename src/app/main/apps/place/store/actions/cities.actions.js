import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_CITIES = '[COUNTRIES APP] GET CITIES';
export const OPEN_CITY_DIALOG = '[COUNTRIES APP] OPEN CITY DIALOG';
export const CLOSE_CITY_DIALOG = '[COUNTRIES APP] CLOSE CITY DIALOG';
export const SELECT_CITY = '[COUNTRIES APP] SELECT CITY';

export const SET_SEARCH_TEXT = '[COUNTRIES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_CITIES = '[COUNTRIES APP] TOGGLE IN SELECTED CITIES';
export const SELECT_ALL_CITIES = '[COUNTRIES APP] SELECT ALL CITIES';
export const DESELECT_ALL_CITIES = '[COUNTRIES APP] DESELECT ALL CITIES';
export const OPEN_NEW_CITY_DIALOG = '[COUNTRIES APP] OPEN NEW CITY DIALOG';
export const CLOSE_NEW_CITY_DIALOG = '[COUNTRIES APP] CLOSE NEW CITY DIALOG';
export const OPEN_EDIT_CITY_DIALOG = '[COUNTRIES APP] OPEN EDIT CITY DIALOG';
export const CLOSE_EDIT_CITY_DIALOG = '[COUNTRIES APP] CLOSE EDIT CITY DIALOG';
export const ADD_CITY = '[COUNTRIES APP] ADD CITY';
export const UPDATE_CITY = '[COUNTRIES APP] UPDATE CITY';
export const REMOVE_CITY = '[COUNTRIES APP] REMOVE CITY';
export const REMOVE_CITIES = '[COUNTRIES APP] REMOVE CITIES';
export const GET_ROUTES = '[COUNTRIES APP] GET ROUTES';
export const WAIT_CITIES = '[COUNTRIES APP] ADD LOADING CITIES';


export function getCities()
{
    const request = axios.get('/api/place-app/cities');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CITIES,
                payload: response.data,
            })
        );
}


export function addCity(newCity)
{
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_CITIES, payload: true});
		
		const {image} = newCity; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "post"); 
				newCity["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				newCity["image"] = "";
			}
		}
        const request = axios.post('/api/place-app/create-city', {
            city:newCity
        });

        return request.then((response) =>
            Promise.all([
				dispatch({type: CLOSE_NEW_CITY_DIALOG}),
				dispatch({type: WAIT_CITIES, payload: false}),
                dispatch({
                    type: ADD_CITY
                })
            ]).then(() => dispatch(getCities()))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_CITIES, payload: false});
		});
    };
}

export function updateCity(city)
{
    return async (dispatch, getState) => {
		dispatch({type: WAIT_CITIES, payload: true});
		
		const {image} = city; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "put"); 
				city["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				city["image"] = "";
			}
		}
		
        const request = axios.put('/api/place-app/save-city', {
            city
        });

        return request.then((response) =>
            Promise.all([	
				dispatch({type: CLOSE_EDIT_CITY_DIALOG}),
				dispatch({type: WAIT_CITIES, payload: false}),
                dispatch({
                    type: UPDATE_CITY
                })
            ]).then(() => dispatch(getCities()))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_CITIES, payload: false});
		});
    };
}

export function removeCity(id)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/place-app/remove-cities', {
            data:{
				cityIds  : [id],
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CITY
                })
            ]).then(() => dispatch(getCities()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}


export function removeCities(cities)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/place-app/remove-cities', {
            data:{
				cityIds: cities
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_CITIES
                }),
                dispatch({
                    type: DESELECT_ALL_CITIES
                })
            ]).then(() => dispatch(getCities()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedCities(cityId)
{
    return {
        type: TOGGLE_IN_SELECTED_CITIES,
        cityId
    }
}

export function selectAllCities()
{
    return {
        type: SELECT_ALL_CITIES
    }
}

export function deSelectAllCities()
{
    return {
        type: DESELECT_ALL_CITIES
    }
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "city_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function openNewCityDialog()
{
    return {
        type: OPEN_NEW_CITY_DIALOG
    }
}

export function closeNewCityDialog()
{
    return {
        type: CLOSE_NEW_CITY_DIALOG
    }
}

export function openEditCityDialog(data)
{
    return {
        type: OPEN_EDIT_CITY_DIALOG,
        data
    }
}

export function closeEditCityDialog()
{
    return {
        type: CLOSE_EDIT_CITY_DIALOG
    }
}
