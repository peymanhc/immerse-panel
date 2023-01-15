import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_COMPANIES = '[COMPANY APP] GET COMPANIES';
export const SET_COMPANIES_SEARCH_TEXT = '[COMPANY APP] SET COMPANIES SEARCH TEXT';

export function getCompanies()
{
    const request = axios.get('/api/company/companies');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPANIES,
                payload: response.data
            })
        );
}

export function setCompaniesSearchText(event)
{
    return {
        type      : SET_COMPANIES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function removeCompanies(idList)
{
	const request = axios.delete('/api/company/remove', {data : {idList}});
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPANIES,
                payload: response.data,
            })
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));	
}