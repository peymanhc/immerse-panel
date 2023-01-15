import axios from 'axios';
import {getFilters} from './filters.actions';
import {getFolders} from './folders.actions';
import {getLabels} from './labels.actions';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_PROPERTYS = '[IMMERSE PROPERTY APP] GET PROPERTYS';
export const UPDATE_PROPERTYS = '[IMMERSE PROPERTY APP] UPDATE PROPERTYS';
export const TOGGLE_STARRED = '[IMMERSE PROPERTY APP] TOGGLE STARRED';
export const TOGGLE_COMPLETED = '[IMMERSE PROPERTY APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[IMMERSE PROPERTY APP] TOGGLE IMPORTANT';
export const UPDATE_PROPERTY = '[IMMERSE PROPERTY APP] UPDATE PROPERTY';
export const ADD_PROPERTY = '[IMMERSE PROPERTY APP] ADD PROPERTY';
export const REMOVE_PROPERTY = '[IMMERSE PROPERTY APP] REMOVE PROPERTY';
export const SET_SEARCH_TEXT = '[IMMERSE PROPERTY APP] SET SEARCH TEXT';
export const OPEN_NEW_PROPERTY_DIALOG = '[IMMERSE PROPERTY APP] OPEN NEW PROPERTY DIALOG';
export const CLOSE_NEW_PROPERTY_DIALOG = '[IMMERSE PROPERTY APP] CLOSE NEW PROPERTY DIALOG';
export const OPEN_EDIT_PROPERTY_DIALOG = '[IMMERSE PROPERTY APP] OPEN EDIT PROPERTY DIALOG';
export const CLOSE_EDIT_PROPERTY_DIALOG = '[IMMERSE PROPERTY APP] CLOSE EDIT PROPERTY DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[IMMERSE PROPERTY APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[IMMERSE PROPERTY APP] CHANGE ORDER';
export const OPEN_NEW_LABEL_DIALOG = '[IMMERSE PROPERTY APP] OPEN NEW LABEL DIALOG';
export const CLOSE_NEW_LABEL_DIALOG = '[IMMERSE PROPERTY APP] CLOSE NEW LABEL DIALOG';
export const WAIT_PROPERTY = '[IMMERSE PROPERTY APP] ADD LOADING PROPERTY';


export function getData(match)
{
    return (dispatch) => {
        Promise.all([
            dispatch(getFilters()),
            dispatch(getFolders()),
            dispatch(getLabels())
        ]).then(
            () => dispatch(getPropertys(match)));
    }
}

export function getPropertys(match)
{
    const request = axios.get('/api/immerse-property-app/properties', {
        params: match.params
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_PROPERTYS,
                routeParams: match.params,
                payload    : response.data
            })
        );
}

export function updatePropertys()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().immersePropertyApp.propertys;

        const request = axios.get('/api/immerse-property-app/properties', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_PROPERTYS,
                payload: response.data
            })
        );
    }
}

export function toggleCompleted(property)
{
    const newProperty = {
        ...property,
        completed: !property.completed
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_COMPLETED})
        ]).then(() => dispatch(updateProperty(newProperty)))
    )
}

export function toggleStarred(property)
{
    const newProperty = {
        ...property,
        starred: !property.starred
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateProperty(newProperty)))
    )
}

export function toggleImportant(property)
{
    const newProperty = {
        ...property,
        important: !property.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateProperty(newProperty)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === 'post')
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

export function updateProperty(property)
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
		dispatch({type: WAIT_PROPERTY, payload: true});
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
			const request = axios.put('/api/immerse-property-app/update-property', property);
			return request.then((response) => {  //console.log(response.data);
				dispatch({type: CLOSE_EDIT_PROPERTY_DIALOG});
				dispatch({type: WAIT_PROPERTY, payload: false});				
                Promise.all([
                    dispatch({
                        type   : UPDATE_PROPERTY,
                        payload: response.data
                    })
                ]).then(() => dispatch(updatePropertys()))								
			}).catch(err => {
				dispatch({type: WAIT_PROPERTY, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_PROPERTY, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};	
	
}

export function openNewPropertyDialog()
{
    return {
        type: OPEN_NEW_PROPERTY_DIALOG
    }
}

export function closeNewPropertyDialog()
{
    return {
        type: CLOSE_NEW_PROPERTY_DIALOG
    }
}

export function openNewLabelDialog()
{
    return {
        type: OPEN_NEW_LABEL_DIALOG
    }
}

export function closeNewLabelDialog()
{
    return {
        type: CLOSE_NEW_LABEL_DIALOG
    }
}

export function openEditPropertyDialog(data)
{
    return {
        type: OPEN_EDIT_PROPERTY_DIALOG,
        data
    }
}

export function closeEditPropertyDialog()
{
    return {
        type: CLOSE_EDIT_PROPERTY_DIALOG
    }
}

export function addProperty(property)
{
	
	const images = [];
	if(property.images){
		if(property.images.background)
			images.push({id:'background', file: property.images.background.file});
		if(property.images.icon)
			images.push({id:'icon', file: property.images.icon.file});
	}	
	return (dispatch) => {   //important for sync funstions
		dispatch({type: WAIT_PROPERTY, payload: true});
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
			const request = axios.post('/api/immerse-property-app/new-property', property);
			return request.then(() => { 
				dispatch({type: CLOSE_NEW_PROPERTY_DIALOG});
				dispatch({type: WAIT_PROPERTY, payload: false});
					Promise.all([
						dispatch({
							type: ADD_PROPERTY
						})
					]).then(() => dispatch(updatePropertys()))											
			}).catch(err => {
				dispatch({type: WAIT_PROPERTY, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_PROPERTY, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};	
	
}

export function removeProperty(propertyId)
{
    const request = axios.delete('/api/immerse-property-app/remove-property', {data:{propertyId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_PROPERTY
                    })
                ]).then(() => dispatch(updatePropertys()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function toggleOrderDescending()
{
    return {
        type: TOGGLE_ORDER_DESCENDING
    }
}

export function changeOrder(orderBy)
{
    return {
        type: CHANGE_ORDER,
        orderBy
    }
}
