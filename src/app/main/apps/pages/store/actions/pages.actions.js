import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_PAGES = '[PAGE APP] GET PAGES';
export const UPDATE_PAGES  = '[PAGE APP] UPDATE PAGES';
export const OPEN_NEW_PAGES_DIALOG = '[PAGE APP] OPEN NEW PAGES DIALOG';
export const CLOSE_NEW_PAGES_DIALOG = '[PAGE APP] CLOSE NEW PAGES DIALOG';
export const OPEN_EDIT_PAGES_DIALOG = '[PAGE APP] OPEN EDIT PAGES DIALOG';
export const CLOSE_EDIT_PAGES_DIALOG = '[PAGE APP] CLOSE EDIT PAGES DIALOG';
export const SET_PAGES_SEARCH_TEXT = '[PAGE APP] SET PAGES SEARCH TEXT';
export const TOGGLE_PAGES_ORDER_DESCENDING = '[PAGE APP] TOGGLE PAGES ORDER DESCENDING';
export const CHANGE_PAGES_ORDER = '[PAGE APP] CHANGE PAGES ORDER';
export const TOGGLE_STARRED = '[PAGE APP] TOGGLE PAGES STARRED';
export const TOGGLE_IMPORTANT = '[PAGE APP] TOGGLE PAGES IMPORTANT';
export const TOGGLE_ENABLE = '[PAGE APP] TOGGLE PAGES ENABLE';
export const TOGGLE_DISABLE = '[PAGE APP] TOGGLE PAGES DISABLE';
export const ADD_PAGES = '[PAGE APP] ADD PAGES';
export const REMOVE_PAGES = '[PAGE APP] REMOVE PAGES';
export const WAIT_PAGES = '[PAGE APP] ADD LOADING PAGES';



export function getPages()
{
    const request = axios.get('/api/page-app/getPages');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                page   : GET_PAGES,
                payload: response.data
            })
        );
}
 
export function setPagesSearchText(event)
{
    return {
        page      : SET_PAGES_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changePagesOrder(orderBy)
{
    return {
        page: CHANGE_PAGES_ORDER,
        orderBy
    }
}

export function togglePagesOrderDescending()
{
    return {
        page: TOGGLE_PAGES_ORDER_DESCENDING
    }
}

export function togglePagesStarred(page)
{
    const newPages = {
        ...page,
        starred: !page.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({page: TOGGLE_STARRED})
        ]).then(() => dispatch(updatePages(newPages)))
    )
}

export function togglePagesImportant(page)
{
    const newPages = {
        ...page,
        important: !page.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({page: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updatePages(newPages)))
    )
}

const uploadImage = (file, id, page) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "page_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(page === "post")
			axios.post('/api/page-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/page-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updatePages(page)
{	
    return async (dispatch) => {	
		dispatch({page: WAIT_PAGES, payload: true});
		const {image_full} = page; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "page", "put"); 
				page["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				page["image_full"] = "";
			}
		}		
		const request = axios.put('/api/page-app/update-page', page);
        return request.then((response) => {
			dispatch({page: CLOSE_EDIT_PAGES_DIALOG});
			dispatch({page: WAIT_PAGES, payload: false});
			return dispatch(getPages())	
        }).catch((err) => {
			console.log(err);
			dispatch({page: WAIT_PAGES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditPagesDialog()
{
    return {
        page: CLOSE_EDIT_PAGES_DIALOG
    }
}

export function closeNewPagesDialog()
{
    return {
        page: CLOSE_NEW_PAGES_DIALOG
    }
}

export function openEditPagesDialog(data)
{ 
    return {
        page: OPEN_EDIT_PAGES_DIALOG,
        data
    }
}

export function openNewPagesDialog()
{
    return {
        page: OPEN_NEW_PAGES_DIALOG
    }
}

export function addPages(page)
{
 
    return async (dispatch) => {	
		dispatch({page: WAIT_PAGES, payload: true});
		const {image_full} = page; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "page", "post"); 
				page["image_full"] = img.url;				
			}
			catch(err){ 
				page["image_full"] = "";
			}
		}		
		const request = axios.post('/api/page-app/new-page', page);
        return request.then((response) => {
			dispatch({page: CLOSE_NEW_PAGES_DIALOG});
			dispatch({page: WAIT_PAGES, payload: false});
			return dispatch(getPages())	
        }).catch((err) => {
			console.log(err);
			dispatch({page: WAIT_PAGES, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removePages(pagesId)
{
    const request = axios.delete('/api/page-app/remove-page', {data: {pageId:pagesId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        page: REMOVE_PAGES
                    })
                ]).then(() => dispatch(getPages()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
