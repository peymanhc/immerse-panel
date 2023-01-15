import axios from 'axios';
import {getFilters} from './filters.actions';
import {getFolders} from './folders.actions';
import {getLabels} from './labels.actions';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CATEGORYS = '[ENGLISH SKILL CATEGORY APP] GET CATEGORYS';
export const UPDATE_CATEGORYS = '[ENGLISH SKILL CATEGORY APP] UPDATE CATEGORYS';
export const TOGGLE_STARRED = '[ENGLISH SKILL CATEGORY APP] TOGGLE STARRED';
export const TOGGLE_COMPLETED = '[ENGLISH SKILL CATEGORY APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[ENGLISH SKILL CATEGORY APP] TOGGLE IMPORTANT';
export const UPDATE_CATEGORY = '[ENGLISH SKILL CATEGORY APP] UPDATE CATEGORY';
export const ADD_CATEGORY = '[ENGLISH SKILL CATEGORY APP] ADD CATEGORY';
export const REMOVE_CATEGORY = '[ENGLISH SKILL CATEGORY APP] REMOVE CATEGORY';
export const SET_SEARCH_TEXT = '[ENGLISH SKILL CATEGORY APP] SET SEARCH TEXT';
export const OPEN_NEW_CATEGORY_DIALOG = '[ENGLISH SKILL CATEGORY APP] OPEN NEW CATEGORY DIALOG';
export const CLOSE_NEW_CATEGORY_DIALOG = '[ENGLISH SKILL CATEGORY APP] CLOSE NEW CATEGORY DIALOG';
export const OPEN_EDIT_CATEGORY_DIALOG = '[ENGLISH SKILL CATEGORY APP] OPEN EDIT CATEGORY DIALOG';
export const CLOSE_EDIT_CATEGORY_DIALOG = '[ENGLISH SKILL CATEGORY APP] CLOSE EDIT CATEGORY DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[ENGLISH SKILL CATEGORY APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[ENGLISH SKILL CATEGORY APP] CHANGE ORDER';
export const OPEN_NEW_LABEL_DIALOG = '[ENGLISH SKILL CATEGORY APP] OPEN NEW LABEL DIALOG';
export const CLOSE_NEW_LABEL_DIALOG = '[ENGLISH SKILL CATEGORY APP] CLOSE NEW LABEL DIALOG';
export const WAIT_CATEGORY = '[ENGLISH SKILL CATEGORY APP] ADD LOADING CATEGORY';
export const GET_TYPES = '[ENGLISH SKILL CATEGORY APP] GET TYPES';

export function getTypesC()
{
    const request = axios.get('/api/english-skill-category-app/types');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TYPES,
                payload: response.data
            })
        );
}

export function getData(match)
{
    return (dispatch) => {
        Promise.all([
            dispatch(getFilters()),
            dispatch(getFolders()),
            dispatch(getLabels())
        ]).then(
            () => dispatch(getCategorys(match)));
    }
}

export function getCategorys(match)
{
    const request = axios.get('/api/english-skill-category-app/categories', {
        params: match.params
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CATEGORYS,
                routeParams: match.params,
                payload    : response.data
            })
        );
}

export function updateCategorys()
{
    return (dispatch, getState) => {

        const {routeParams} = getState().englishSkillCategoryApp.categorys;

        const request = axios.get('/api/english-skill-category-app/categories', {
            params: routeParams
        });

        return request.then((response) =>
            dispatch({
                type   : UPDATE_CATEGORYS,
                payload: response.data
            })
        );
    }
}

export function toggleCompleted(category)
{
    const newCategory = {
        ...category,
        completed: !category.completed
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_COMPLETED})
        ]).then(() => dispatch(updateCategory(newCategory)))
    )
}

export function toggleStarred(category)
{
    const newCategory = {
        ...category,
        starred: !category.starred
    };
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateCategory(newCategory)))
    )
}

export function toggleImportant(category)
{
    const newCategory = {
        ...category,
        important: !category.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateCategory(newCategory)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/english-skill-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/english-skill-category-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

const saveImage = (files, type) => {
	const promises = [];
	files.forEach(({file, id}) => {
		promises.push(uploadImage(file, id, type));
	});
	return Promise.all(promises);
};

export function updateCategory(category)
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
		dispatch({type: WAIT_CATEGORY, payload: true});
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
			const request = axios.put('/api/english-skill-category-app/update-category', category);
			return request.then((response) => {  //console.log(response.data);
				dispatch({type: CLOSE_EDIT_CATEGORY_DIALOG});
				dispatch({type: WAIT_CATEGORY, payload: false});				
                Promise.all([
                    dispatch({
                        type   : UPDATE_CATEGORY,
                        payload: response.data
                    })
                ]).then(() => dispatch(updateCategorys()))								
			}).catch(err => {
				dispatch({type: WAIT_CATEGORY, payload: false});	
				dispatch(showMessage({message: 'Access Denied'}))
			});				
		}).catch(err => {
			dispatch({type: WAIT_CATEGORY, payload: false});	
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	};	
	
}

export function openNewCategoryDialog()
{
    return {
        type: OPEN_NEW_CATEGORY_DIALOG
    }
}

export function closeNewCategoryDialog()
{
    return {
        type: CLOSE_NEW_CATEGORY_DIALOG
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

export function openEditCategoryDialog(data)
{
    return {
        type: OPEN_EDIT_CATEGORY_DIALOG,
        data
    }
}

export function closeEditCategoryDialog()
{
    return {
        type: CLOSE_EDIT_CATEGORY_DIALOG
    }
}

export function addCategory(category)
{
	
	const images = [];
	if(category.images){
		if(category.images.background)
			images.push({id:'background', file: category.images.background.file});
		if(category.images.icon)
			images.push({id:'icon', file: category.images.icon.file});
	}	
	return (dispatch) => {   //important for sync funstions
		dispatch({type: WAIT_CATEGORY, payload: true});
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
			const request = axios.post('/api/english-skill-category-app/new-category', category);
			return request.then(() => { 
				dispatch({type: CLOSE_NEW_CATEGORY_DIALOG});
				dispatch({type: WAIT_CATEGORY, payload: false});
					Promise.all([
						dispatch({
							type: ADD_CATEGORY
						})
					]).then(() => dispatch(updateCategorys()))										
			}).catch(err => {
				dispatch({type: WAIT_CATEGORY, payload: false});
				dispatch(showMessage({message: 'Access Denied'}));
			});				
		}).catch(err => {
			dispatch({type: WAIT_CATEGORY, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	};	
	
}

export function removeCategory(categoryId)
{
    const request = axios.delete('/api/english-skill-category-app/remove-category', {data:{categoryId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_CATEGORY
                    })
                ]).then(() => dispatch(updateCategorys())).catch(err => dispatch(showMessage({message: 'Access Denied'})))
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
