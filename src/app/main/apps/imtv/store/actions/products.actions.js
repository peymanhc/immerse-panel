import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
export const GET_PRODUCTS = '[IM-TV APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[IM-TV APP] SET PRODUCTS SEARCH TEXT';

export function getProducts(perPage, page)
{	
	const skip = (perPage * (page + 1)) - perPage; 
    const request = axios.get('/api/e-commerce-app/products', {
        params: {
			limit: perPage,
			skip: skip,
			type: 'imtv',
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
	const request = axios.delete('/api/e-commerce-app/products/remove', {data : {idList, limit: perPage, skip}});
    return (dispatch) =>
        request.then((response) =>
            dispatch(dispatch(getProducts(perPage, page)))
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

