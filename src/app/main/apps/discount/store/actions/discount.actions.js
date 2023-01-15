import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_DISCOUNT = '[DISCOUNT APP] GET DISCOUNT';
export const SAVE_DISCOUNT = '[DISCOUNT APP] SAVE DISCOUNT';
export const WAIT_DISCOUNT = '[DISCOUNT APP] WAIT DISCOUNT';
export const GET_CITIES = '[DISCOUNT APP] GET DISCOUNT CITIES';

export function getDiscount(params)
{ 
    const request = axios.get('/api/discount-app', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DISCOUNT,
                payload: response.data
            })
        );
}

export function saveDiscount(data)
{ 
	let request = axios.put('/api/discount-app/save', data);
	if(data.id === null)
		request = axios.post('/api/discount-app/create', data);	
    return (dispatch) => {
		dispatch({type: WAIT_DISCOUNT, payload: true});	
        return request.then((response) => {
				dispatch({type: WAIT_DISCOUNT, payload: false});
                dispatch(showMessage({message: 'Discount Saved'}));       
                return dispatch({
                    type   : SAVE_DISCOUNT,
                    payload: response.data
                })
            }
        ).catch(err => {
			dispatch({type: WAIT_DISCOUNT, payload: false});	
			dispatch(showMessage({message: 'Access Denied'}))
		});
	}
}

export function newDiscount()
{
    const data = {
        id              				: null,
		discountName					: '',
		discountCode					: '',
		discountCity					: '',
		discountMaximumGlobalUsageLimit	: 0,
		discountPerUserUsageLimit		: 0,
		discountStartDate				: new Date(),
		discountEndDate					: new Date(),
		discountMinimumRidePrice		: 0,
		discountType					: null,
		discountMaxDiscount				: 0,
		discountPercentage				: 0,
		discountPrice					: 0,
    };

    return {
        type   : GET_DISCOUNT,
        payload: data
    }
}

export function getCities()
{ 
    const request = axios.get('/api/discount-app/cities');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CITIES,
                payload: response.data
            })
        );
}
 