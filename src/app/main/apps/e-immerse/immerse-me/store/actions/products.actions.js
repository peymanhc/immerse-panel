import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';
export const GET_PRODUCTS = '[E-EMMERSE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-EMMERSE APP] SET PRODUCTS SEARCH TEXT';
export const OPEN_PRODUCTS_EXCEL_DIALOG = '[E-EMMERSE APP] OPEN_PRODUCTS_EXCEL_DIALOG';
export const CLOSE_PRODUCTS_EXCEL_DIALOG = '[E-EMMERSE APP] CLOSE_PRODUCTS_EXCEL_DIALOG';
export const WAIT_PRODUCTS_EXCEL = '[E-EMMERSE APP] WAIT_PRODUCTS_EXCEL';

export function getProducts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/immerse-app/products', {
        params: {
			limit: perPage,
			skip: skip  ,
			type: 'immerse',
		}
    });	
    return (dispatch) =>	
		request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data.products,
				count: response.data.count
            })
        );
	
} 

export function removeProducts(idList, perPage, page)
{
	const skip = (perPage * (page + 1)) - perPage;
	const request = axios.delete('/api/immerse-app/products/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data.products,
				count: response.data.count
            })
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function closeProductsUploadDialog()
{
    return {
        type: CLOSE_PRODUCTS_EXCEL_DIALOG
    }
}

export function openProductsUploadDialog()
{ 
    return {
        type: OPEN_PRODUCTS_EXCEL_DIALOG
    }
}

export function uploadExcelToProducts(file)
{
    	
    return (dispatch) => {
		dispatch({type: WAIT_PRODUCTS_EXCEL, payload: true});
		return uploadExcel(file).then((excel) => { 
			//console.log(excel);
			if(excel.url === undefined)
				dispatch(showMessage({message: 'Format file is not valid.'}));			
			else
				dispatch(showMessage({message: file.name + ' has been successfully uploaded.'}));
			dispatch({type: WAIT_PRODUCTS_EXCEL, payload: false});
			return new Promise((resolve, reject)=> {
				if(excel.url === undefined)
					reject();
				else
					resolve(excel.url);
			});
		}).catch(err => {
			dispatch({type: WAIT_PRODUCTS_EXCEL, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});			
	}

}

const uploadExcel = (file) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "p_e_" + FuseUtils.generateGUID() + "_" ;
		formData.append(fileName, file);
		axios.post('/api/immerse-app/excel-upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};


