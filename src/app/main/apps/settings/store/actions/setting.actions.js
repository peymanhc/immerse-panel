import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

import {setPanelLocale} from 'app/store/actions/';
export const GET_SETTING = '[SETTING APP] GET SETTING';
export const SAVE_SETTING = '[SETTING APP] SAVE SETTING';
export const GET_LANGUAGES = '[SETTING APP] GET LANGUAGES';
export const WAIT_SETTING = '[SETTING APP] WAIT SETTING';
export const GET_CURRENCIES = '[SETTING APP] GET CURRENCIES';
export const CLOSE_ADD_CURRENCY_DIALOG = '[SETTING APP] CLOSE ADD CURRENCY DIALOG';
export const OPEN_ADD_CURRENCY_DIALOG = '[SETTING APP] OPEN ADD CURRENCY DIALOG';
export const OPEN_EDIT_CURRENCY_DIALOG = '[SETTING APP] OPEN EDIT CURRENCY DIALOG';
export const CLOSE_EDIT_CURRENCY_DIALOG = '[SETTING APP] CLOSE EDIT CURRENCY DIALOG';

export function getSettings(){
    const request = axios.get('/api/settings/');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SETTING,
                payload: response.data
            })
        );
}

export function getCurrencies(){
    const request = axios.get('/api/settings/currencies');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CURRENCIES,
                payload: response.data
            })
        );
}

export function saveSettings(data){ 

    return async (dispatch) => {
		
		dispatch({type: WAIT_SETTING, payload: true});
		const {siteBackground, siteLogo, siteFavIco, siteBaner1, siteBaner2, siteBaner3, siteBaner4} = data; 
	
		if(typeof siteBackground === "object"){
			try{
				const img = await uploadImage(siteBackground.file, "siteBackground");
				data["siteBackground"] = img.url;				
			}
			catch(err){
				data["siteBackground"] = "";
			}
		}
		
		if(typeof siteLogo === "object"){
			try{
				const img = await uploadImage(siteLogo.file, "siteLogo");
				data["siteLogo"] = img.url;
			}
			catch(err){
				data["siteLogo"] = "";
			}
		}
		
		if(typeof siteFavIco === "object"){
			try{
				const img = await uploadImage(siteFavIco.file, "siteFavIco");
				data["siteFavIco"] = img.url;
			}
			catch(err){
				data["siteFavIco"] = "";
			}	
		}	

		if(typeof siteBaner1 === "object"){
			try{
				const img = await uploadImage(siteBaner1.file, "siteBaner1");
				data["siteBaner1"] = img.url;
			}
			catch(err){
				data["siteBaner1"] = "";
			}	
		}
		
		if(typeof siteBaner2 === "object"){
			try{
				const img = await uploadImage(siteBaner2.file, "siteBaner2");
				data["siteBaner2"] = img.url;
			}
			catch(err){
				data["siteBaner2"] = "";
			}	
		}	
		
		if(typeof siteBaner3 === "object"){
			try{
				const img = await uploadImage(siteBaner3.file, "siteBaner3");
				data["siteBaner3"] = img.url;
			}
			catch(err){
				data["siteBaner3"] = "";
			}	
		}
		
		if(typeof siteBaner4 === "object"){
			try{
				const img = await uploadImage(siteBaner4.file, "siteBaner4");
				data["siteBaner4"] = img.url;
			}
			catch(err){
				data["siteBaner4"] = "";
			}	
		}		
		
		const request = axios.put('/api/settings/save', data);
		
        return request.then((response) => {
				dispatch({type: WAIT_SETTING, payload: false}); 
				dispatch(showMessage({message: 'Setting Saved'}));
				dispatch(updatePanelLanguage(data.panelLanguage));
                return dispatch({
                    type   : SAVE_SETTING,
                    payload: response.data
                })
            }
        ).catch(err => {
			dispatch({type: WAIT_SETTING, payload: false});	
			dispatch(showMessage({message: 'Access Denied'}))
		});
	}
}

const uploadImage = (file, id) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "s_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		axios.put('/api/settings/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function getLanguages(){
    const request = axios.get('/api/settings/languages');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LANGUAGES,
                payload: response.data
            })
        );
}

export function updatePanelLanguage(locale){
    const request = axios.post('/api/auth/user/updateLanguage', {locale});

    return (dispatch) =>
        request.then((response) => dispatch(setPanelLocale(locale)));
}

export function closeAddPriceDialog(){
    return {
        type: CLOSE_ADD_CURRENCY_DIALOG
    }
}

export function openAddPriceDialog(){ 
    return {
        type: OPEN_ADD_CURRENCY_DIALOG
    }
}

export function openEditPriceDialog(data){ 
    return {
        type: OPEN_EDIT_CURRENCY_DIALOG,
		data
    }
}

export function closeEditPriceDialog(){
    return {
        type: CLOSE_EDIT_CURRENCY_DIALOG
    }
}

export function addCurrency(curency){
 
    return async (dispatch) => {	

 		
		const request = axios.post('/api/settings/new-currency', curency);
        return request.then((response) => {
			dispatch({type: CLOSE_ADD_CURRENCY_DIALOG});

			return dispatch(getCurrencies())	
        }).catch((err) => {
			console.log(err);
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function updateCurrency(curency){ 
 
    return async (dispatch) => {	 		
		const request = axios.put('/api/settings/update-currency', curency);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_CURRENCY_DIALOG});

			return dispatch(getCurrencies())	
        }).catch((err) => {
			console.log(err);
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeSliders(currenciesId){
    const request = axios.delete('/api/settings/remove-currency', {data: {currenciesId}});

    return (dispatch) =>
        request.then((response) => dispatch(getCurrencies())
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
