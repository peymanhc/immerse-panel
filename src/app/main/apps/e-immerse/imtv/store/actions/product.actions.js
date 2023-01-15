import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
 
export const GET_PRODUCT = '[E-EMMERSE APP] GET PRODUCT';
export const GET_TYPES = '[E-EMMERSE APP] GET TYPES';
export const SAVE_PRODUCT = '[E-EMMERSE APP] SAVE PRODUCT';
export const ADD_IMAGE_PRODUCT = '[E-EMMERSE APP] ADD IMAGE PRODUCT';
export const REMOVE_IMAGE_PRODUCT = '[E-EMMERSE APP] REMOVE IMAGE PRODUCT';
export const WAIT_PRODUCT = '[E-EMMERSE APP] ADD LOADING PRODUCT';
export const OPEN_NEW_CATEGORY_DIALOG = '[E-EMMERSE APP] OPEN NEW CATEGORY DIALOG';
export const OPEN_NEW_PROPERTY_DIALOG = '[E-EMMERSE APP] OPEN NEW PROPERTY DIALOG';
export const CLOSE_NEW_CATEGORY_DIALOG = '[E-EMMERSE APP] CLOSE NEW CATEGORY DIALOG';
export const CLOSE_NEW_PROPERTY_DIALOG = '[E-EMMERSE APP] CLOSE NEW PROPERTY DIALOG';
export const GET_CATEGORY_LABELS = '[E-EMMERSE APP] GET CATEGORY LABELS';
export const GET_PROPERTY_LABELS = '[E-EMMERSE APP] GET PROPERTY LABELS';
export const GET_CATEGORIES = '[E-EMMERSE APP] GET CATEGORIES';
export const GET_PROPERTIES = '[E-EMMERSE APP] GET PROPERTY';
export const SET_PROPERTY_SELECT  = '[E-EMMERSE APP] SET PROPERTY SELECT';
export const SET_PROPERTY_LABEL_SELECT = '[E-EMMERSE APP] SET PROPERTY LABEL SELECT';
export const ADD_NEW_PROPERTY = '[E-EMMERSE APP] ADD NEW PROPERTY';
export const REMOVE_PROPERTY = '[E-EMMERSE APP] REMOVE PROPERTY';
export const EDIT_PROPERTY = '[E-EMMERSE APP] EDIT PROPERTY';
export const SET_PROPERTY_LABEL_FILTER = '[E-EMMERSE APP] SET PROPERTY LABEL FILTER';
export const OPEN_CROP_DIALOG = '[E-EMMERSE APP] OPEN CROP DIALOG';
export const CLOSE_CROP_DIALOG = '[E-EMMERSE APP] CLOSE CROP DIALOG'; 
export const GET_CLUSTER = '[E-EMMERSE APP] GET_CLUSTER';
export const GET_MASTER = '[E-EMMERSE APP] GET_MASTER';

export function getCategoryLabels()
{
    const request = axios.get('/api/imtv-app/category-labels'  , {params:{type:'imtv'}});

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
    const request = axios.get('/api/imtv-app/types');

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
    const request = axios.get('/api/imtv-app/property-labels' , {params:{type:'imtv'}});

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
    const request = axios.get('/api/imtv-app/categories', {params:{type:'imtv'}});

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
    const request = axios.get('/api/imtv-app/properties' , {params:{type:'imtv'}});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROPERTIES,
                payload: response.data
            })
        );
}

export function getClusterlist()
{
    const request = axios.get('/api/imtv-app/clusterlist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_CLUSTER,
                payload    : response.data
            })
        );
}


export function getMasterlist()
{
    const request = axios.get('/api/imtv-app/masterlist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type       : GET_MASTER,
                payload    : response.data
            })
        );
}


export function getProduct(params)
{
    const request = axios.get('/api/imtv-app/product', {params});

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
					axios.post('/api/imtv-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 
				else
					axios.put('/api/imtv-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
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
				request = axios.post('/api/imtv-app/product/create', form);		
			else
				request = axios.put('/api/imtv-app/product/save', form);
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

export function openNewCategoryDialog(form)
{
    return {
        type	: OPEN_NEW_CATEGORY_DIALOG,
		payload	: form,
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
		categoryLabels		: [],
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
		  type                : 'imtv',
		commisionPercentage	: 0,
		wish				: 0,
		supplierId			: null,
		stockId				: null,
		clusterId			: null,  
		userId				: null,
		masterId			: null,
		companyId			: -1,
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

