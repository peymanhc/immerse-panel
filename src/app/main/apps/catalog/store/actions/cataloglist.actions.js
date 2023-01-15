import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';


export const GET_CATALOGLIST = '[CATALOG APP] GET CATALOGLIST';
export const UPDATE_CATALOGLIST  = '[CATALOG APP] UPDATE CATALOGLIST';
export const OPEN_NEW_CATALOGLIST_DIALOG = '[CATALOG APP] OPEN NEW CATALOGLIST DIALOG';
export const CLOSE_NEW_CATALOGLIST_DIALOG = '[CATALOG APP] CLOSE NEW CATALOGLIST DIALOG';
export const OPEN_EDIT_CATALOGLIST_DIALOG = '[CATALOG APP] OPEN EDIT CATALOGLIST DIALOG';
export const CLOSE_EDIT_CATALOGLIST_DIALOG = '[CATALOG APP] CLOSE EDIT CATALOGLIST DIALOG';
export const SET_CATALOGLIST_SEARCH_TEXT = '[CATALOG APP] SET CATALOGLIST SEARCH TEXT';
export const TOGGLE_CATALOGLIST_ORDER_DESCENDING = '[CATALOG APP] TOGGLE CATALOGLIST ORDER DESCENDING';
export const CHANGE_CATALOGLIST_ORDER = '[CATALOG APP] CHANGE CATALOGLIST ORDER';
export const TOGGLE_STARRED = '[CATALOG APP] TOGGLE CATALOGLIST STARRED';
export const TOGGLE_IMPORTANT = '[CATALOG APP] TOGGLE CATALOGLIST IMPORTANT';
export const TOGGLE_ENABLE = '[CATALOG APP] TOGGLE CATALOGLIST ENABLE';
export const TOGGLE_DISABLE = '[CATALOG APP] TOGGLE CATALOGLIST DISABLE';
export const ADD_CATALOGLIST = '[CATALOG APP] ADD CATALOGLIST';
export const REMOVE_CATALOGLIST = '[CATALOG APP] REMOVE CATALOGLIST';
export const WAIT_CATALOGLIST = '[CATALOG APP] ADD LOADING CATALOGLIST';
export const GET_TYPES = '[CATALOG APP] GET TYPES';


export function getCataloglist()
{
    const request = axios.get('/api/catalog-app/getCataloglist');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATALOGLIST,
                payload: response.data
            })
        );
}
 
export function setCataloglistSearchText(event)
{
    return {
        type      : SET_CATALOGLIST_SEARCH_TEXT,
        searchText: event.target.value.toLowerCase()
    }
}

export function changeCataloglistOrder(orderBy)
{
    return {
        type: CHANGE_CATALOGLIST_ORDER,
        orderBy
    }
}

export function toggleCataloglistOrderDescending()
{
    return {
        type: TOGGLE_CATALOGLIST_ORDER_DESCENDING
    }
}

export function toggleCataloglistStarred(catalog)
{
    const newCataloglist = {
        ...catalog,
        starred: !catalog.starred
    }; 
    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_STARRED})
        ]).then(() => dispatch(updateCataloglist(newCataloglist)))
    )
}

export function toggleCataloglistImportant(catalog)
{
    const newCataloglist = {
        ...catalog,
        important: !catalog.important
    };

    return (dispatch) => (
        Promise.all([
            dispatch({type: TOGGLE_IMPORTANT})
        ]).then(() => dispatch(updateCataloglist(newCataloglist)))
    )
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "catalog_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/catalog-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/catalog-app/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function updateCataloglist(catalog)
{	
    return async (dispatch) => {	
		dispatch({type: WAIT_CATALOGLIST, payload: true});
		const {image_full, image_mobile, image_classic} = catalog; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "catalog", "put"); 
				catalog["image_full"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				catalog["image_full"] = "";
			}
		}	
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "catalog", "put"); 
				catalog["image_mobile"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				catalog["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "catalog", "put"); 
				catalog["image_classic"] = img.url;				
			}
			catch(err){ 
				//console.log(err);
				catalog["image_classic"] = "";
			}
		}	
		const request = axios.put('/api/catalog-app/update-catalog', catalog);
        return request.then((response) => {
			dispatch({type: CLOSE_EDIT_CATALOGLIST_DIALOG});
			dispatch({type: WAIT_CATALOGLIST, payload: false});
			return dispatch(getCataloglist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_CATALOGLIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function closeEditCataloglistDialog()
{
    return {
        type: CLOSE_EDIT_CATALOGLIST_DIALOG
    }
}

export function closeNewCataloglistDialog()
{
    return {
        type: CLOSE_NEW_CATALOGLIST_DIALOG
    }
}

export function openEditCataloglistDialog(data)
{ 
    return {
        type: OPEN_EDIT_CATALOGLIST_DIALOG,
        data
    }
}

export function openNewCataloglistDialog()
{
    return {
        type: OPEN_NEW_CATALOGLIST_DIALOG
    }
}

export function addCataloglist(catalog)
{
 
    return async (dispatch) => {	
		dispatch({type: WAIT_CATALOGLIST, payload: true});
		const {image_full, image_mobile, image_classic} = catalog; 
		if(typeof image_full === "object"){
			try{
				const img = await uploadImage(image_full.file, "catalog", "post"); 
				catalog["image_full"] = img.url;				
			}
			catch(err){ 
				catalog["image_full"] = "";
			}
		}
		if(typeof image_mobile === "object"){
			try{
				const img = await uploadImage(image_mobile.file, "catalog", "post"); 
				catalog["image_mobile"] = img.url;				
			}
			catch(err){ 
				catalog["image_mobile"] = "";
			}
		}	
		if(typeof image_classic === "object"){
			try{
				const img = await uploadImage(image_classic.file, "catalog", "post"); 
				catalog["image_classic"] = img.url;				
			}
			catch(err){ 
				catalog["image_classic"] = "";
			}
		}		
		const request = axios.post('/api/catalog-app/new-catalog', catalog);
        return request.then((response) => {
			dispatch({type: CLOSE_NEW_CATALOGLIST_DIALOG});
			dispatch({type: WAIT_CATALOGLIST, payload: false});
			return dispatch(getCataloglist())	
        }).catch((err) => {
			console.log(err);
			dispatch({type: WAIT_CATALOGLIST, payload: false});
			dispatch(showMessage({message: 'Access Denied'}));
		});
	}	
}

export function removeCataloglist(cataloglistId)
{
    const request = axios.delete('/api/catalog-app/remove-catalog', {data: {catalogId:cataloglistId}});

    return (dispatch) =>
        request.then((response) => (
                Promise.all([
                    dispatch({
                        type: REMOVE_CATALOGLIST
                    })
                ]).then(() => dispatch(getCataloglist()))
            )
        ).catch(err => dispatch(showMessage({message: 'Access Denied'})));
}
