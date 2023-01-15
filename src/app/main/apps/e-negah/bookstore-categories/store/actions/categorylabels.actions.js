import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CATEGORYLABELS = '[BLOG CATEGORY APP] GET CATEGORYLABELS';
export const UPDATE_CATEGORYLABELS  = '[BLOG CATEGORY APP] UPDATE CATEGORYLABELS';
export const OPEN_NEW_CATEGORYLABELS_DIALOG = '[BLOG CATEGORY APP] OPEN NEW CATEGORYLABELS DIALOG';
export const CLOSE_NEW_CATEGORYLABELS_DIALOG = '[BLOG CATEGORY APP] CLOSE NEW CATEGORYLABELS DIALOG';
export const OPEN_EDIT_CATEGORYLABELS_DIALOG = '[BLOG CATEGORY APP] OPEN EDIT CATEGORYLABELS DIALOG';
export const CLOSE_EDIT_CATEGORYLABELS_DIALOG = '[BLOG CATEGORY APP] CLOSE EDIT CATEGORYLABELS DIALOG';
export const SET_CATEGORYLABELS_SEARCH_TEXT = '[BLOG CATEGORY APP] SET CATEGORYLABELS SEARCH TEXT';
export const TOGGLE_CATEGORYLABELS_ORDER_DESCENDING = '[BLOG CATEGORY APP] TOGGLE CATEGORYLABELS ORDER DESCENDING';
export const CHANGE_CATEGORYLABELS_ORDER = '[BLOG CATEGORY APP] CHANGE CATEGORYLABELS ORDER';
export const TOGGLE_STARRED = '[BLOG CATEGORY APP] TOGGLE CATEGORYLABELS STARRED';
export const TOGGLE_IMPORTANT = '[BLOG CATEGORY APP] TOGGLE CATEGORYLABELS IMPORTANT';
export const TOGGLE_ENABLE = '[BLOG CATEGORY APP] TOGGLE CATEGORYLABELS ENABLE';
export const TOGGLE_DISABLE = '[BLOG CATEGORY APP] TOGGLE CATEGORYLABELS DISABLE';
export const ADD_CATEGORYLABELS = '[BLOG CATEGORY APP] ADD CATEGORYLABELS';
export const REMOVE_CATEGORYLABELS = '[BLOG CATEGORY APP] REMOVE CATEGORYLABELS';
export const WAIT_CATEGORYLABELS = '[BLOG CATEGORY APP] ADD LOADING CATEGORYLABELS';
export const GET_TYPES = '[BLOG CATEGORY APP] GET TYPES';

export function getTypes()
{
    const request = axios.get('/api/bookstore-category-app/types');

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
    const request = axios.get('/api/bookstore-category-app/labels');

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
			axios.post('/api/bookstore-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/bookstore-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
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
			const request = axios.put('/api/bookstore-category-app/update-category-label', category);
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
			const request = axios.post('/api/bookstore-category-app/new-label', category);
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
    const request = axios.delete('/api/bookstore-category-app/remove-category-label', {data: {categoryId}});

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
