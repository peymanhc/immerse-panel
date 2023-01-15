import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_PROPERTYLABELS = '[IMMERSE PROPERTY APP] GET PROPERTYLABELS';
export const UPDATE_PROPERTYLABELS  = '[IMMERSE PROPERTY APP] UPDATE PROPERTYLABELS';
export const OPEN_NEW_PROPERTYLABELS_DIALOG = '[IMMERSE PROPERTY APP] OPEN NEW PROPERTYLABELS DIALOG';
export const CLOSE_NEW_PROPERTYLABELS_DIALOG = '[IMMERSE PROPERTY APP] CLOSE NEW PROPERTYLABELS DIALOG';
export const OPEN_EDIT_PROPERTYLABELS_DIALOG = '[IMMERSE PROPERTY APP] OPEN EDIT PROPERTYLABELS DIALOG';
export const CLOSE_EDIT_PROPERTYLABELS_DIALOG = '[IMMERSE PROPERTY APP] CLOSE EDIT PROPERTYLABELS DIALOG';
export const SET_PROPERTYLABELS_SEARCH_TEXT = '[IMMERSE PROPERTY APP] SET PROPERTYLABELS SEARCH TEXT';
export const TOGGLE_PROPERTYLABELS_ORDER_DESCENDING = '[IMMERSE PROPERTY APP] TOGGLE PROPERTYLABELS ORDER DESCENDING';
export const CHANGE_PROPERTYLABELS_ORDER = '[IMMERSE PROPERTY APP] CHANGE PROPERTYLABELS ORDER';
export const TOGGLE_STARRED = '[IMMERSE PROPERTY APP] TOGGLE PROPERTYLABELS STARRED';
export const TOGGLE_IMPORTANT = '[IMMERSE PROPERTY APP] TOGGLE PROPERTYLABELS IMPORTANT';
export const TOGGLE_ENABLE = '[IMMERSE PROPERTY APP] TOGGLE PROPERTYLABELS ENABLE';
export const TOGGLE_DISABLE = '[IMMERSE PROPERTY APP] TOGGLE PROPERTYLABELS DISABLE';
export const ADD_PROPERTYLABELS = '[IMMERSE PROPERTY APP] ADD PROPERTYLABELS';
export const REMOVE_PROPERTYLABELS = '[IMMERSE PROPERTY APP] REMOVE PROPERTYLABELS';
export const WAIT_PROPERTYLABELS = '[IMMERSE PROPERTY APP] ADD LOADING PROPERTYLABELS';



export function getPropertyLabels()
{
    const request = axios.get('/api/immerse-property-app/labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTYLABELS,
                payload: response.data
            })
        );
}
 
export function setPropertyLabelsSearchText(event)
{
    return {
        type      : SET_PROPERTYLABELS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changePropertyLabelsOrder(orderBy)
{
    return {
        type: CHANGE_PROPERTYLABELS_ORDER,
        orderBy
    }
}

export function togglePropertyLabelsOrderDescending()
{
    return {
        type: TOGGLE_PROPERTYLABELS_ORDER_DESCENDING
    }
}

export function togglePropertyLabelsStarred(property)
{
    const newProperty = {
        ...property,
        starred: !property.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updatePropertyLabel(newProperty)))
    )
}

export function togglePropertyLabelsImportant(property)
{
    const newProperty = {
        ...property,
        important: !property.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updatePropertyLabel(newProperty)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/immerse-property-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
		else
			axios.put('/api/immerse-property-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};

export function updatePropertyLabel(property)
{
	//console.log(property);	
	const images = [];
	if(property.images){
		if(property.images.background)
			images.push({id:'background', file: property.images.background.file});
		if(property.images.icon)
			images.push({id:'icon', file: property.images.icon.file});
	}
	//console.log(images);
	return (dispatch) => {
		dispatch({type: WAIT_PROPERTYLABELS, payload: true});
		return saveImage(images, 'put').then((images) => { 
			//console.log(images);
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						property.imageSrc = url;
					else if(id === "icon")
						property.iconSrc= url;
				});
			delete property.images;	
			//console.log(property);
			const request = axios.put('/api/immerse-property-app/update-property-label', property);
			return request.then((response) => {  //console.log(response.data);
				dispatch({type: CLOSE_EDIT_PROPERTYLABELS_DIALOG});
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
				return dispatch({
					type   : UPDATE_PROPERTYLABELS,
					payload: response.data
				})				
			}).catch(err => {
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};
}

export function closeEditPropertyLabelsDialog()
{
    return {
        type: CLOSE_EDIT_PROPERTYLABELS_DIALOG
    }
}

export function closeNewPropertyLabelsDialog()
{
    return {
        type: CLOSE_NEW_PROPERTYLABELS_DIALOG
    }
}

export function openEditPropertyLabelsDialog(data)
{ 
    return {
        type: OPEN_EDIT_PROPERTYLABELS_DIALOG,
        data
    }
}

export function openNewPropertyLabelsDialog()
{
    return {
        type: OPEN_NEW_PROPERTYLABELS_DIALOG
    }
}

export function addPropertyLabels(property)
{
	const images = [];
	if(property.images){
		if(property.images.background)
			images.push({id:'background', file: property.images.background.file});
		if(property.images.icon)
			images.push({id:'icon', file: property.images.icon.file});
	}	
	return (dispatch) => {   //important for sync funstions
		dispatch({type: WAIT_PROPERTYLABELS, payload: true});
		return saveImage(images, 'post').then((images) => { 
			//console.log(images);
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						property.imageSrc = url;
					else if(id === "icon")
						property.iconSrc= url;
				});
			delete property.images;	
			//console.log(property);
			const request = axios.post('/api/immerse-property-app/new-label', property);
			return request.then(() => { 
				dispatch({type: CLOSE_NEW_PROPERTYLABELS_DIALOG});
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
					Promise.all([
						dispatch({
							type: ADD_PROPERTYLABELS
						})
					]).then(() => dispatch(getPropertyLabels()))											
			}).catch(err => {
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_PROPERTYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};	
}

export function removePropertyLabels(propertyId)
{
    const request = axios.delete('/api/immerse-property-app/remove-property-label', {data: {propertyId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_PROPERTYLABELS
                    })
                ]).then(() => dispatch(getPropertyLabels()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}