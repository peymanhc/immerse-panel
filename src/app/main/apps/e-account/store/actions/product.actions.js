import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_PRODUCT = '[E-ACCOUNT APP] GET PRODUCT';
export const GET_TYPES = '[E-ACCOUNT APP] GET TYPES';
export const SAVE_PRODUCT = '[E-ACCOUNT APP] SAVE PRODUCT';
export const ADD_IMAGE_PRODUCT = '[E-ACCOUNT APP] ADD IMAGE PRODUCT';
export const REMOVE_IMAGE_PRODUCT = '[E-ACCOUNT APP] REMOVE IMAGE PRODUCT';
export const WAIT_PRODUCT = '[E-ACCOUNT APP] ADD LOADING PRODUCT';
export const OPEN_NEW_CATEGORY_DIALOG = '[E-ACCOUNT APP] OPEN NEW CATEGORY DIALOG';
export const OPEN_NEW_PROPERTY_DIALOG = '[E-ACCOUNT APP] OPEN NEW PROPERTY DIALOG';
export const CLOSE_NEW_CATEGORY_DIALOG = '[E-ACCOUNT APP] CLOSE NEW CATEGORY DIALOG';
export const CLOSE_NEW_PROPERTY_DIALOG = '[E-ACCOUNT APP] CLOSE NEW PROPERTY DIALOG';
export const GET_CATEGORY_LABELS = '[E-ACCOUNT APP] GET CATEGORY LABELS';
export const GET_PROPERTY_LABELS = '[E-ACCOUNT APP] GET PROPERTY LABELS';
export const GET_CATEGORIES = '[E-ACCOUNT APP] GET CATEGORIES';
export const GET_PROPERTIES = '[E-ACCOUNT APP] GET PROPERTY';
export const SET_PROPERTY_SELECT  = '[E-ACCOUNT APP] SET PROPERTY SELECT';
export const SET_PROPERTY_LABEL_SELECT = '[E-ACCOUNT APP] SET PROPERTY LABEL SELECT';
export const ADD_NEW_PROPERTY = '[E-ACCOUNT APP] ADD NEW PROPERTY';
export const REMOVE_PROPERTY = '[E-ACCOUNT APP] REMOVE PROPERTY';
export const EDIT_PROPERTY = '[E-ACCOUNT APP] EDIT PROPERTY';
export const SET_PROPERTY_LABEL_FILTER = '[E-ACCOUNT APP] SET PROPERTY LABEL FILTER';
export const OPEN_CROP_DIALOG = '[E-ACCOUNT APP] OPEN CROP DIALOG';
export const CLOSE_CROP_DIALOG = '[E-ACCOUNT APP] CLOSE CROP DIALOG'; 

export function getCategoryLabels()
{
    const request = axios.get('/api/e-account-app/category-labels');

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
    const request = axios.get('/api/e-account-app/types');

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
    const request = axios.get('/api/e-account-app/property-labels');

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
    const request = axios.get('/api/e-account-app/categories');

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
    const request = axios.get('/api/e-account-app/properties');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTIES,
                payload: response.data
            })
        );
}

export function getProduct(params)
{
    const request = axios.get('/api/e-account-app/product', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCT,
                payload: response.data
            })
        );
}

export function addImageProduct(image){ 
	return {type:ADD_IMAGE_PRODUCT, image};
} 

export function removeImageProduct(id){ 
	return {type:REMOVE_IMAGE_PRODUCT, payload:id};
} 
	
export function saveProduct(data, productId)
{
	const {form, images} = data;
	
	return (dispatch) => {
		dispatch({type:WAIT_PRODUCT, payload:true});
		const uploadImage = (file, id) => {	
			return new Promise((resolve, reject) => {
				var formData = new FormData();	
				var fileName = "p_" + form.id + "_" + id + "_";
				formData.append(fileName, file);
				if(productId === 'new')
					axios.post('/api/e-account-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 
				else
					axios.put('/api/e-account-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
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
			if(productId === 'new')
				request = axios.post('/api/e-account-app/product/create', form);		
			else
				request = axios.put('/api/e-account-app/product/save', form);
			return request.then((response) => {
					dispatch(showMessage({message: 'Product Saved'}));
					dispatch({type:WAIT_PRODUCT, payload:false});
					return dispatch({
						type   : SAVE_PRODUCT,
						payload: response.data
					})
				}
			).catch((err) => {
				dispatch(showMessage({message: 'Access Denied'}));
				dispatch({type:WAIT_PRODUCT, payload:false});
			})			
		}).catch(err => {
			dispatch(showMessage({message: 'Access Denied'}));
			dispatch({type:WAIT_PRODUCT, payload:false})
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

export function newProduct(){
    const data = {
        id              	: FuseUtils.generateGUID(),
        name            	: '',
        handle          	: '',
        description     	: '',
        categories      	: [],
		categoriesObject	: [],
		properties      	: [],
        tags            	: [],
        images          	: [],
        priceTaxExcl    	: 0,
        priceTaxIncl    	: 0,
        taxRate         	: 0,
        comparedPrice   	: 0,
        quantity        	: 0,
        sku             	: '',
        width           	: '',
        height          	: '',
        depth           	: '',
        weight          	: '',
        extraShippingFee	: 0,
        active          	: true,
		info            	: '',
		expirationDate  	: '',
		discount        	: 0,
		publish         	: false,
		linkToProduct   	: null,
		like				: 0,
		type				: null,
		commisionPercentage	: 0,
		wish				: 0,
		supplierId			: null,
		stockId				: null,
    };

    return {
        type   : GET_PRODUCT,
        payload: data
    }
}

export function closeCropDialog()
{
    return {
        type: CLOSE_CROP_DIALOG
    }
}

export function openCropDialog(imageSrc)
{
    return {
        type: OPEN_CROP_DIALOG,
		imageSrc
    }
}

