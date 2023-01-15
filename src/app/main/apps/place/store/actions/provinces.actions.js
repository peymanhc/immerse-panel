import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {FuseUtils} from '@fuse';

export const GET_PROVINCES = '[COUNTRIES APP] GET PROVINCES';
export const OPEN_PROVINCE_DIALOG = '[COUNTRIES APP] OPEN PROVINCE DIALOG';
export const CLOSE_PROVINCE_DIALOG = '[COUNTRIES APP] CLOSE PROVINCE DIALOG';
export const SELECT_PROVINCE = '[COUNTRIES APP] SELECT PROVINCE';

export const SET_SEARCH_TEXT = '[COUNTRIES APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_PROVINCES = '[COUNTRIES APP] TOGGLE IN SELECTED PROVINCES';
export const SELECT_ALL_PROVINCES = '[COUNTRIES APP] SELECT ALL PROVINCES';
export const DESELECT_ALL_PROVINCES = '[COUNTRIES APP] DESELECT ALL PROVINCES';
export const OPEN_NEW_PROVINCE_DIALOG = '[COUNTRIES APP] OPEN NEW PROVINCE DIALOG';
export const CLOSE_NEW_PROVINCE_DIALOG = '[COUNTRIES APP] CLOSE NEW PROVINCE DIALOG';
export const OPEN_EDIT_PROVINCE_DIALOG = '[COUNTRIES APP] OPEN EDIT PROVINCE DIALOG';
export const CLOSE_EDIT_PROVINCE_DIALOG = '[COUNTRIES APP] CLOSE EDIT PROVINCE DIALOG';
export const ADD_PROVINCE = '[COUNTRIES APP] ADD PROVINCE';
export const UPDATE_PROVINCE = '[COUNTRIES APP] UPDATE PROVINCE';
export const REMOVE_PROVINCE = '[COUNTRIES APP] REMOVE PROVINCE';
export const REMOVE_PROVINCES = '[COUNTRIES APP] REMOVE PROVINCES';
export const GET_ROUTES = '[COUNTRIES APP] GET ROUTES';
export const WAIT_PROVINCES = '[COUNTRIES APP] ADD LOADING PROVINCES';


export function getProvinces()
{
    const request = axios.get('/api/place-app/provinces');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROVINCES,
                payload: response.data,
            })
        );
}


export function addProvince(newProvince)
{
    return async (dispatch, getState) => {
		
		dispatch({type: WAIT_PROVINCES, payload: true});
		
		const {image} = newProvince; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "post"); 
				newProvince["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				newProvince["image"] = "";
			}
		}
        const request = axios.post('/api/place-app/create-province', {
            province:newProvince
        });

        return request.then((response) =>
            Promise.all([
				dispatch({type: CLOSE_NEW_PROVINCE_DIALOG}),
				dispatch({type: WAIT_PROVINCES, payload: false}),
                dispatch({
                    type: ADD_PROVINCE
                })
            ]).then(() => dispatch(getProvinces()))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_PROVINCES, payload: false});
		});
    };
}

export function updateProvince(province)
{
    return async (dispatch, getState) => {
		dispatch({type: WAIT_PROVINCES, payload: true});
		
		const {image} = province; 
		if(typeof image === "object"){
			try{
				const img = await uploadImage(image.file, "place", "put"); 
				province["image"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				province["image"] = "";
			}
		}
		
        const request = axios.put('/api/place-app/save-province', {
            province
        });

        return request.then((response) =>
            Promise.all([	
				dispatch({type: CLOSE_EDIT_PROVINCE_DIALOG}),
				dispatch({type: WAIT_PROVINCES, payload: false}),
                dispatch({
                    type: UPDATE_PROVINCE
                })
            ]).then(() => dispatch(getProvinces()))
        ).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			return dispatch({type: WAIT_PROVINCES, payload: false});
		});
    };
}

export function removeProvince(id)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/place-app/remove-provinces', {
            data:{
				provinceIds  : [id],
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PROVINCE
                })
            ]).then(() => dispatch(getProvinces()))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
    };
}


export function removeProvinces(provinces)
{
    return (dispatch, getState) => {

        const request = axios.delete('/api/place-app/remove-provinces', {
            data:{
				provinceIds: provinces
			}
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PROVINCES
                }),
                dispatch({
                    type: DESELECT_ALL_PROVINCES
                })
            ]).then(() => dispatch(getProvinces()))
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

export function toggleInSelectedProvinces(provinceId)
{
    return {
        type: TOGGLE_IN_SELECTED_PROVINCES,
        provinceId
    }
}

export function selectAllProvinces()
{
    return {
        type: SELECT_ALL_PROVINCES
    }
}

export function deSelectAllProvinces()
{
    return {
        type: DESELECT_ALL_PROVINCES
    }
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "province_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/place-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function openNewProvinceDialog()
{
    return {
        type: OPEN_NEW_PROVINCE_DIALOG
    }
}

export function closeNewProvinceDialog()
{
    return {
        type: CLOSE_NEW_PROVINCE_DIALOG
    }
}

export function openEditProvinceDialog(data)
{
    return {
        type: OPEN_EDIT_PROVINCE_DIALOG,
        data
    }
}

export function closeEditProvinceDialog()
{
    return {
        type: CLOSE_EDIT_PROVINCE_DIALOG
    }
}
