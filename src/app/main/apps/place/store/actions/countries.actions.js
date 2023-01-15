import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_COUNTRIES = '[COUNTRIES APP] GET COUNTRIES';
export const OPEN_COUNTRIES_DIALOG = '[COUNTRIES APP] OPEN COUNTRIES DIALOG';
export const CLOSE_COUNTRIES_DIALOG = '[COUNTRIES APP] CLOSE COUNTRIES DIALOG';
export const SELECT_COUNTRY = '[COUNTRIES APP] SELECT COUNTRY';

export const SET_SEARCH_TEXT = '[COUNTRIES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_COUNTRIES = '[COUNTRIES APP] TOGGLE IN SELECTED COUNTRIES';
export const SELECT_ALL_COUNTRIES = '[COUNTRIES APP] SELECT ALL COUNTRIES';
export const DESELECT_ALL_COUNTRIES = '[COUNTRIES APP] DESELECT ALL COUNTRIES';
export const OPEN_NEW_COUNTRY_DIALOG = '[COUNTRIES APP] OPEN NEW COUNTRY DIALOG';
export const CLOSE_NEW_COUNTRY_DIALOG = '[COUNTRIES APP] CLOSE NEW COUNTRY DIALOG';
export const OPEN_EDIT_COUNTRY_DIALOG = '[COUNTRIES APP] OPEN EDIT COUNTRY DIALOG';
export const CLOSE_EDIT_COUNTRY_DIALOG = '[COUNTRIES APP] CLOSE EDIT COUNTRY DIALOG';
export const ADD_COUNTRY = '[COUNTRIES APP] ADD COUNTRY';
export const UPDATE_COUNTRY = '[COUNTRIES APP] UPDATE COUNTRY';
export const REMOVE_COUNTRY = '[COUNTRIES APP] REMOVE COUNTRY';
export const REMOVE_COUNTRIES = '[COUNTRIES APP] REMOVE COUNTRIES';
export const TOGGLE_STARRED_COUNTRY = '[COUNTRIES APP] TOGGLE STARRED COUNTRY';
export const TOGGLE_STARRED_COUNTRIES = '[COUNTRIES APP] TOGGLE STARRED COUNTRIES';
export const SET_COUNTRIES_STARRED = '[COUNTRIES APP] SET COUNTRIES STARRED ';
export const GET_COUNTRY_DATA = '[COUNTRIES APP] GET COUNTRY DATA';
export const WAIT_COUNTRIES = '[COUNTRIES APP] ADD LOADING COUNTRY';

export function getCountries(routeParams)
{
    const request = axios.get('/api/place-app/countries', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COUNTRIES,
                payload: response.data,
                routeParams
            })
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedCountries(countryId)
{
    return {
        type: TOGGLE_IN_SELECTED_COUNTRIES,
        countryId
    }
}


export function selectAllCountries()
{
    return {
        type: SELECT_ALL_COUNTRIES
    }
}

export function deSelectAllCountries()
{
    return {
        type: DESELECT_ALL_COUNTRIES
    }
}


export function openNewCountryDialog()
{
    return {
        type: OPEN_NEW_COUNTRY_DIALOG
    }
}

export function closeNewCountryDialog()
{
    return {
        type: CLOSE_NEW_COUNTRY_DIALOG
    }
}

export function openEditCountryDialog(data)
{
    return {
        type: OPEN_EDIT_COUNTRY_DIALOG,
        data
    }
}

export function closeEditCountryDialog()
{
    return {
        type: CLOSE_EDIT_COUNTRY_DIALOG
    }
}

export function addCountry(newCountry)
{
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_COUNTRIES, payload: true});
		
		const {image} = newCountry; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "post"); 
				newCountry["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				newCountry["image"] = "";
			}
		}		

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.post('/api/place-app/create-country', {
            country:newCountry
        });

        return request.then((response) =>
            Promise.all([
				dispatch({type: CLOSE_NEW_COUNTRY_DIALOG}),
				dispatch({type: WAIT_COUNTRIES, payload: false}),
                dispatch({
                    type: ADD_COUNTRY
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_COUNTRIES, payload: false});
		});
    };
}

export function updateCountry(country)
{
    return async (dispatch, getState) => {
		dispatch({type: WAIT_COUNTRIES, payload: true});
		
		const {image} = country; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "put"); 
				country["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				country["image"] = "";
			}
		}			
		
        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.put('/api/place-app/save-country', {
            country
        });

        return request.then((response) =>
            Promise.all([
				dispatch({type: CLOSE_EDIT_COUNTRY_DIALOG}),
				dispatch({type: WAIT_COUNTRIES, payload: false}),
                dispatch({
                    type: UPDATE_COUNTRY
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_COUNTRIES, payload: false});
		});
    };
}

export function removeCountry(countryId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.delete('/api/place-app/remove-countries', {
            data:{
				countryIds:[countryId]
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_COUNTRY
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function removeCountries(countryIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.delete('/api/place-app/remove-countries', {
            data:{
				countryIds
			}
        }).catch(err => dispatch(showMessage({message: 'Access Denied'})));

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_COUNTRIES
                }),
                dispatch({
                    type: DESELECT_ALL_COUNTRIES
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredCountry(countryId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.put('/api/place-app/toggle-starred-countries', {
            countryIds:[countryId]
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_COUNTRY
                }),
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function toggleStarredCountries(countryIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.put('/api/place-app/toggle-starred-countries', {
            countryIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_COUNTRIES
                }),
                dispatch({
                    type: DESELECT_ALL_COUNTRIES
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setCountriesStarred(countryIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.put('/api/place-app/set-countries-starred', {
            countryIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_COUNTRIES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_COUNTRIES
                })
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

export function setCountriesUnstarred(countryIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().CountriesApp.countries;

        const request = axios.put('/api/place-app/set-countries-unstarred', {
            countryIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_COUNTRIES_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_COUNTRIES
                }),
            ]).then(() => dispatch(getCountries(routeParams)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "country_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function openCountryDialog()
{
    return {
        type: OPEN_COUNTRIES_DIALOG
    }
}

export function closeCountryDialog()
{
    return {
        type: CLOSE_COUNTRIES_DIALOG
    }
}

export function selectCountry(value)
{
    return {
        type: SELECT_COUNTRY,
		payload: value
    }	
}