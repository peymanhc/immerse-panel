import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_DISCOUNTS = '[DISCOUNT APP] GET DISCOUNTS';
export const SET_DISCOUNTS_SEARCH_TEXT = '[DISCOUNT APP] SET DISCOUNTS SEARCH TEXT';

export function getDiscounts()
{
    const request = axios.get('/api/discount-app/discounts');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DISCOUNTS,
                payload: response.data
            })
        );
}

export function setDiscountsSearchText(event)
{
    return {
        type      : SET_DISCOUNTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function removeDiscounts(idList)
{
	const request = axios.delete('/api/discount-app/remove', {data : {idList}});
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DISCOUNTS,
                payload: response.data,
            })
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}