import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_POST = '[IDEA APP] GET POST';
export const GET_TYPES = '[IDEA APP] GET TYPES';
export const SAVE_POST = '[IDEA APP] SAVE POST';
export const ADD_IMAGE_POST = '[IDEA APP] ADD IMAGE POST';
export const REMOVE_IMAGE_POST = '[IDEA APP] REMOVE IMAGE POST';
export const WAIT_POST = '[IDEA APP] ADD LOADING POST';
export const OPEN_NEW_CATEGORY_DIALOG = '[IDEA APP] OPEN NEW CATEGORY DIALOG';
export const OPEN_NEW_PROPERTY_DIALOG = '[IDEA APP] OPEN NEW PROPERTY DIALOG';
export const CLOSE_NEW_CATEGORY_DIALOG = '[IDEA APP] CLOSE NEW CATEGORY DIALOG';
export const CLOSE_NEW_PROPERTY_DIALOG = '[IDEA APP] CLOSE NEW PROPERTY DIALOG';
export const GET_CATEGORY_LABELS = '[IDEA APP] GET CATEGORY LABELS';
export const GET_PROPERTY_LABELS = '[IDEA APP] GET PROPERTY LABELS';
export const GET_CATEGORIES = '[IDEA APP] GET CATEGORIES';
export const GET_PROPERTIES = '[IDEA APP] GET PROPERTY';
export const SET_PROPERTY_SELECT  = '[IDEA APP] SET PROPERTY SELECT';
export const SET_PROPERTY_LABEL_SELECT = '[IDEA APP] SET PROPERTY LABEL SELECT';
export const ADD_NEW_PROPERTY = '[IDEA APP] ADD NEW PROPERTY';
export const REMOVE_PROPERTY = '[IDEA APP] REMOVE PROPERTY';
export const EDIT_PROPERTY = '[IDEA APP] EDIT PROPERTY';
export const SET_PROPERTY_LABEL_FILTER = '[IDEA APP] SET PROPERTY LABEL FILTER';

export function getCategoryLabels()
{
    const request = axios.get('/api/idea-app/category-labels');

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
    const request = axios.get('/api/idea-app/types');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_TYPES,
                payload: response.data
            })
        );
}

export function getPropertyLabels()
{
    const request = axios.get('/api/idea-app/property-labels');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTY_LABELS,
                payload: response.data
            })
        );
}

export function getCategories()
{
    const request = axios.get('/api/idea-app/categories');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        );
}

export function getProperties()
{
    const request = axios.get('/api/idea-app/properties');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTIES,
                payload: response.data
            })
        );
}

export function getPost(params) {
    const request = axios.get('/api/idea-app/post', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_POST,
                payload: response.data
            })
        );
}

export function addImagePost(image) { 
	return {type:ADD_IMAGE_POST, image};
} 

export function removeImagePost(id) { 
	return {type:REMOVE_IMAGE_POST, payload:id};
} 
	
export function savePost(data, postId) {
	const {form, images} = data;
	
	return (dispatch) => {
		dispatch({type:WAIT_POST, payload:true});
		const uploadImage = (file, id) => {	
			return new Promise((resolve, reject) => {
				var formData = new FormData();	
				var fileName = "p_" + form.id + "_" + id + "_";
				formData.append(fileName, file);
				if(postId === 'new')
					axios.post('/api/idea-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 
				else
					axios.put('/api/idea-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
			});
		};
	
		const saveImage = (files) => {
			const promises = [];
			files.forEach(({file, id}) => {
				promises.push(uploadImage(file, id));
			});
			return Promise.all(promises);
		};		
		return saveImage(images).then((images) => {
			form.images = form.images.concat(images);
			if(!form.featuredImageId && form.images.length)
				form.featuredImageId = form.images[0].id;
			let request = null;
			form.type = "idea";
			if(postId === 'new')
				request = axios.post('/api/idea-app/post/create', form);		
			else
				request = axios.put('/api/idea-app/post/save', form);
			return request.then((response) => {
					dispatch(showMessage({message: 'Post Saved'}));
					dispatch({type:WAIT_POST, payload:false});
					return dispatch({
						type   : SAVE_POST,
						payload: response.data
					})
				}
			).catch((err) => {
				dispatch(showMessage({message: 'Access Denied'}));
				dispatch({type:WAIT_POST, payload:false});
			})			
		}).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			dispatch({type:WAIT_POST, payload:false})
		});

	};		
	

}

export function openNewCategoryDialog() {
    return {
        type: OPEN_NEW_CATEGORY_DIALOG
    }
}

export function closeNewCategoryDialog() {
    return {
        type: CLOSE_NEW_CATEGORY_DIALOG
    }
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

export function setPropertySelect(value)
{
    return {
        type: SET_PROPERTY_SELECT,
		payload: value
    }
}

export function setPropertyLabelSelect(value)
{
    return {
        type: SET_PROPERTY_LABEL_SELECT,
		payload: value
    }
}

export function addNewProperty(value)
{
    return {
        type: ADD_NEW_PROPERTY,
		payload: value
    }
}

export function removeProperty(value)
{
    return {
        type: REMOVE_PROPERTY,
		payload: value
    }
}

export function editProperty(){
    return {
        type: EDIT_PROPERTY,
    }	
}

export function setPropertyLabelFilter(value){
    return {
        type: SET_PROPERTY_LABEL_FILTER,
		payload: value
    }	
}

export function newPost() {
    const data = {
        id              	: FuseUtils.generateGUID(),
        name            	: '',
        description     	: '',
        categories      	: [],
		categoriesObject	: [],
		publish				: true,
		featuredImageId		: null,
		images				: [],
		tags				: [],
    };

    return {
        type   : GET_POST,
        payload: data
    }
}
