import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_SLIDERS = '[SLIDER APP] GET SLIDERS';
export const UPDATE_SLIDERS  = '[SLIDER APP] UPDATE SLIDERS';
export const OPEN_NEW_SLIDERS_DIALOG = '[SLIDER APP] OPEN NEW SLIDERS DIALOG';
export const CLOSE_NEW_SLIDERS_DIALOG = '[SLIDER APP] CLOSE NEW SLIDERS DIALOG';
export const OPEN_EDIT_SLIDERS_DIALOG = '[SLIDER APP] OPEN EDIT SLIDERS DIALOG';
export const CLOSE_EDIT_SLIDERS_DIALOG = '[SLIDER APP] CLOSE EDIT SLIDERS DIALOG';
export const SET_SLIDERS_SEARCH_TEXT = '[SLIDER APP] SET SLIDERS SEARCH TEXT';
export const TOGGLE_SLIDERS_ORDER_DESCENDING = '[SLIDER APP] TOGGLE SLIDERS ORDER DESCENDING';
export const CHANGE_SLIDERS_ORDER = '[SLIDER APP] CHANGE SLIDERS ORDER';
export const TOGGLE_STARRED = '[SLIDER APP] TOGGLE SLIDERS STARRED';
export const TOGGLE_IMPORTANT = '[SLIDER APP] TOGGLE SLIDERS IMPORTANT';
export const TOGGLE_ENABLE = '[SLIDER APP] TOGGLE SLIDERS ENABLE';
export const TOGGLE_DISABLE = '[SLIDER APP] TOGGLE SLIDERS DISABLE';
export const ADD_SLIDERS = '[SLIDER APP] ADD SLIDERS';
export const REMOVE_SLIDERS = '[SLIDER APP] REMOVE SLIDERS';
export const WAIT_SLIDERS = '[SLIDER APP] ADD LOADING SLIDERS';
export const GET_TYPES = '[SLIDER APP] GET TYPES';


export function getSliders()
{
    const request = axios.get('/api/slider-app/getSliders');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SLIDERS,
                payload: response.data
            })
        );
}
 
export function setSlidersSearchText(event)
{
    return {
        type      : SET_SLIDERS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeSlidersOrder(orderBy)
{
    return {
        type: CHANGE_SLIDERS_ORDER,
        orderBy
    }
}

export function toggleSlidersOrderDescending()
{
    return {
        type: TOGGLE_SLIDERS_ORDER_DESCENDING
    }
}

export function toggleSlidersStarred(slider)
{
    const newSliders = {
        ...slider,
        starred: !slider.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateSliders(newSliders)))
    )
}

export function toggleSlidersImportant(slider)
{
    const newSliders = {
        ...slider,
        important: !slider.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateSliders(newSliders)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "slider_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/slider-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/slider-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateSliders(slider)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_SLIDERS, payload: true});
		const {image_full, image_mobile, image_classic} = slider; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "slider", "put"); 
				slider["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				slider["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "slider", "put"); 
				slider["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				slider["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "slider", "put"); 
				slider["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				slider["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/slider-app/update-slider', slider);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_SLIDERS_DIALOG});
			dispatch({type: WAIT_SLIDERS, payload: false});
			return dispatch(getSliders())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_SLIDERS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditSlidersDialog()
{
    return {
        type: CLOSE_EDIT_SLIDERS_DIALOG
    }
}

export function closeNewSlidersDialog()
{
    return {
        type: CLOSE_NEW_SLIDERS_DIALOG
    }
}

export function openEditSlidersDialog(data)
{ 
    return {
        type: OPEN_EDIT_SLIDERS_DIALOG,
        data
    }
}

export function openNewSlidersDialog()
{
    return {
        type: OPEN_NEW_SLIDERS_DIALOG
    }
}

export function addSliders(slider)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_SLIDERS, payload: true});
		const {image_full, image_mobile, image_classic} = slider; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "slider", "post"); 
				slider["image_full"] = img.url;				
			}
			catch(err){ 
				slider["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "slider", "post"); 
				slider["image_mobile"] = img.url;				
			}
			catch(err){ 
				slider["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "slider", "post"); 
				slider["image_classic"] = img.url;				
			}
			catch(err){ 
				slider["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/slider-app/new-slider', slider);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_SLIDERS_DIALOG});
			dispatch({type: WAIT_SLIDERS, payload: false});
			return dispatch(getSliders())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_SLIDERS, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeSliders(slidersId)
{
    const request = axios.delete('/api/slider-app/remove-slider', {data: {sliderId:slidersId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_SLIDERS
                    })
                ]).then(() => dispatch(getSliders()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
