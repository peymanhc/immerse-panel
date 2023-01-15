import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CATEGORYLABELS = '[CATEGORY APP] GET CATEGORYLABELS';
export const UPDATE_CATEGORYLABELS  = '[CATEGORY APP] UPDATE CATEGORYLABELS';
export const OPEN_NEW_CATEGORYLABELS_DIALOG = '[CATEGORY APP] OPEN NEW CATEGORYLABELS DIALOG';
export const CLOSE_NEW_CATEGORYLABELS_DIALOG = '[CATEGORY APP] CLOSE NEW CATEGORYLABELS DIALOG';
export const OPEN_EDIT_CATEGORYLABELS_DIALOG = '[CATEGORY APP] OPEN EDIT CATEGORYLABELS DIALOG';
export const CLOSE_EDIT_CATEGORYLABELS_DIALOG = '[CATEGORY APP] CLOSE EDIT CATEGORYLABELS DIALOG';
export const SET_CATEGORYLABELS_SEARCH_TEXT = '[CATEGORY APP] SET CATEGORYLABELS SEARCH TEXT';
export const TOGGLE_CATEGORYLABELS_ORDER_DESCENDING = '[CATEGORY APP] TOGGLE CATEGORYLABELS ORDER DESCENDING';
export const CHANGE_CATEGORYLABELS_ORDER = '[CATEGORY APP] CHANGE CATEGORYLABELS ORDER';
export const TOGGLE_STARRED = '[CATEGORY APP] TOGGLE CATEGORYLABELS STARRED';
export const TOGGLE_IMPORTANT = '[CATEGORY APP] TOGGLE CATEGORYLABELS IMPORTANT';
export const TOGGLE_ENABLE = '[CATEGORY APP] TOGGLE CATEGORYLABELS ENABLE';
export const TOGGLE_DISABLE = '[CATEGORY APP] TOGGLE CATEGORYLABELS DISABLE';
export const ADD_CATEGORYLABELS = '[CATEGORY APP] ADD CATEGORYLABELS';
export const REMOVE_CATEGORYLABELS = '[CATEGORY APP] REMOVE CATEGORYLABELS';
export const WAIT_CATEGORYLABELS = '[CATEGORY APP] ADD LOADING CATEGORYLABELS';
export const GET_TYPES = '[CATEGORY APP] GET TYPES';
export const GET_ADS = '[CATEGORY APP] GET_ADS';

export function getClusterlist()
{
    const request = axios.get('/api/category-app/clusterlist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_ADS,
                payload    : response.data
            })
        );
}

export function getTypes()
{
    const request = axios.get('/api/category-app/types');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TYPES,
                payload: response.data
            })
        );
}

export function getCategoryLabels()
{
    const request = axios.get('/api/category-app/labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORYLABELS,
                payload: response.data
            })
        );
}
 
export function setCategoryLabelsSearchText(event)
{
    return {
        type      : SET_CATEGORYLABELS_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeCategoryLabelsOrder(orderBy)
{
    return {
        type: CHANGE_CATEGORYLABELS_ORDER,
        orderBy
    }
}

export function toggleCategoryLabelsOrderDescending()
{
    return {
        type: TOGGLE_CATEGORYLABELS_ORDER_DESCENDING
    }
}

export function toggleCategoryLabelsStarred(category)
{
    const newCategory = {
        ...category,
        starred: !category.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateCategoryLabel(newCategory)))
    )
}

export function toggleCategoryLabelsImportant(category)
{
    const newCategory = {
        ...category,
        important: !category.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateCategoryLabel(newCategory)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};

export function updateCategoryLabel(category)
{
	//console.log(category);	
	const images = [];
	if(category.images){
		if(category.images.background)
			images.push({id:'background', file: category.images.background.file});
		if(category.images.icon)
			images.push({id:'icon', file: category.images.icon.file});
	}
	//console.log(images);
	return (dispatch) => {
		dispatch({type: WAIT_CATEGORYLABELS, payload: true});
		return saveImage(images, "put").then((images) => { 
			//console.log(images);
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						category.imageSrc = url;
					else if(id === "icon")
						category.iconSrc= url;
				});
			delete category.images;	
			//console.log(category);
			const request = axios.put('/api/category-app/update-category-label', category);
			return request.then((response) => {  //console.log(response.data);
				dispatch({type: CLOSE_EDIT_CATEGORYLABELS_DIALOG});
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
				return dispatch({
					type   : UPDATE_CATEGORYLABELS,
					payload: response.data
				})				
			}).catch(err => {
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};
}

export function closeEditCategoryLabelsDialog()
{
    return {
        type: CLOSE_EDIT_CATEGORYLABELS_DIALOG
    }
}

export function closeNewCategoryLabelsDialog()
{
    return {
        type: CLOSE_NEW_CATEGORYLABELS_DIALOG
    }
}

export function openEditCategoryLabelsDialog(data)
{ 
    return {
        type: OPEN_EDIT_CATEGORYLABELS_DIALOG,
        data
    }
}

export function openNewCategoryLabelsDialog()
{
    return {
        type: OPEN_NEW_CATEGORYLABELS_DIALOG
    }
}

export function addCategoryLabels(category)
{
	const images = [];
	if(category.images){
		if(category.images.background)
			images.push({id:'background', file: category.images.background.file});
		if(category.images.icon)
			images.push({id:'icon', file: category.images.icon.file});
	}	
	return (dispatch) => {   //important for sync funstions
		dispatch({type: WAIT_CATEGORYLABELS, payload: true});
		return saveImage(images, "post").then((images) => { 
			//console.log(images);
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						category.imageSrc = url;
					else if(id === "icon")
						category.iconSrc= url;
				});
			delete category.images;	
			//console.log(category);
			const request = axios.post('/api/category-app/new-label', category);
			return request.then(() => { 
				dispatch({type: CLOSE_NEW_CATEGORYLABELS_DIALOG});
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
					Promise.all([
						dispatch({
							type: ADD_CATEGORYLABELS
						})
					]).then(() => dispatch(getCategoryLabels()))											
			}).catch(err => {
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
				dispatch({type: WAIT_CATEGORYLABELS, payload: false});
				dispatch(showMessage({message: 'Access Denied'}))
			});			
	};	
}

export function removeCategoryLabels(categoryId)
{
    const request = axios.delete('/api/category-app/remove-category-label', {data: {categoryId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_CATEGORYLABELS
                    })
                ]).then(() => dispatch(getCategoryLabels()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}