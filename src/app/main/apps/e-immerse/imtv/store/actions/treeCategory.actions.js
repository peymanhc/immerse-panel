import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_ENTIRE_CATEGORIES = '[TREE-CATEGORY APP] GET ENTIRE CATEGORIES';
export const GET_CATEGORY_LABELS = '[TREE-CATEGORY APP] GET CATEGORY LABELS';
export const WAIT_CATEGORY = '[TREE-CATEGORY APP] ADD LOADING PRODUCT';
export const WAIT_CATEGORY_INDEX = '[TREE-CATEGORY APP] WAIT_CATEGORY_INDEX';
export const OPEN_NEW_CATEGORY_DIALOG = '[TREE-CATEGORY APP] OPEN NEW CATEGORY DIALOG';
export const CLOSE_NEW_CATEGORY_DIALOG = '[TREE-CATEGORY APP] CLOSE NEW CATEGORY DIALOG';
export const OPEN_EDIT_CATEGORY_DIALOG = '[TREE-CATEGORY APP] OPEN EDIT CATEGORY DIALOG';
export const CLOSE_EDIT_CATEGORY_DIALOG = '[TREE-CATEGORY APP] CLOSE EDIT CATEGORY DIALOG';
export const GET_TYPES = '[TREE-CATEGORY APP] GET TYPES';


export function getCategoryLabels()
{
    const request = axios.get('/api/tree-category-app/category-labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORY_LABELS,
                payload: response.data
            })
        );
}

export function getTypes()
{
    const request = axios.get('/api/tree-category-app/types');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TYPES,
                payload: response.data
            })
        );
}

export function getData()
{
    return (dispatch) => {
        Promise.all([
            dispatch(getTypes()),
        ]).finally(
            () => dispatch(getCategories()));
    }
}

export function getCategories()
{
    const request = axios.get('/api/tree-category-app/categories');
	
    return (dispatch) => {
		dispatch({type: WAIT_CATEGORY_INDEX, payload: true});
        return request.then((response) =>
            dispatch({
                type   : GET_ENTIRE_CATEGORIES,
                payload: response.data
            })
        ).catch(err => dispatch(showMessage({message: 'Data fetch error.'}))).finally(() => dispatch({type: WAIT_CATEGORY_INDEX, payload: false}));
	}
}
 
export function openNewCategoryDialog(treeInfo)
{
    return {
        type	: OPEN_NEW_CATEGORY_DIALOG,
		payload	: treeInfo,
    }
}

export function closeNewCategoryDialog()
{
    return {
        type: CLOSE_NEW_CATEGORY_DIALOG
    }
}
 
export function openEditCategoryDialog(form, treeInfo)
{
    return {
        type	: OPEN_EDIT_CATEGORY_DIALOG,
		payload	: form,
		payload2: treeInfo,
    }
}

export function closeEditCategoryDialog()
{
    return {
        type: CLOSE_EDIT_CATEGORY_DIALOG
    }
}

export function addCategory(category, treeIndex)
{
	
	const images = [];
	if(category.images){
		if(category.images.background)
			images.push({id:'background', file: category.images.background.file});
		if(category.images.icon)
			images.push({id:'icon', file: category.images.icon.file});
	}	
	return (dispatch) => {  
		dispatch({type: WAIT_CATEGORY, payload: true});
		return saveImage(images, "post").then((images) => { 
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						category.imageSrc = url;
					else if(id === "icon")
						category.iconSrc= url;
				});
			delete category.images;	
			const request = axios.post('/api/tree-category-app/new-category', {category, treeIndex});
			return request.then(() => dispatch(getCategories())).catch(err => dispatch(showMessage({message: 'Access Denied'}))).finally(() => {
				dispatch({type: WAIT_CATEGORY, payload: false});
				dispatch({type: CLOSE_NEW_CATEGORY_DIALOG});
			});				
		}).catch(err => {
			dispatch({type: WAIT_CATEGORY, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	};	
	
}

export function updateCategory(category, treeInfo)
{
	
	const images = [];
	if(category.images){
		if(category.images.background)
			images.push({id:'background', file: category.images.background.file});
		if(category.images.icon)
			images.push({id:'icon', file: category.images.icon.file});
	}	
	return (dispatch) => {  
		dispatch({type: WAIT_CATEGORY, payload: true});
		return saveImage(images, "put").then((images) => { 
			if(images)
				images.forEach(({url, id}) => {
					if(id === "background")
						category.imageSrc = url;
					else if(id === "icon")
						category.iconSrc= url;
				});
			delete category.images;	
			
			const newNode = {...treeInfo.node, ...category};
			
			const request = axios.put('/api/tree-category-app/update-category', {category : newNode, path : treeInfo.path});
			return request.then(() => dispatch(getCategories())).catch(err => dispatch(showMessage({message: 'Access Denied'}))).finally(() => {
				dispatch({type: WAIT_CATEGORY, payload: false});
				dispatch({type: CLOSE_EDIT_CATEGORY_DIALOG});
			});				
		}).catch(err => {
			dispatch({type: WAIT_CATEGORY, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	};
	
}

export function removeCategory(path)
{
    const request = axios.delete('/api/tree-category-app/remove-category', {data:{path}});

    return (dispatch) =>
        request.then((response) => dispatch(getCategories())).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}

export function onChangeCategory(treeData)
{ 
	const request = axios.put('/api/tree-category-app/on-change-category', {treeData});
    return (dispatch) =>
        request.then((response) =>
            dispatch(getCategories())
        );
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/tree-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/tree-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};




