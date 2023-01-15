import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: '',
	count: 0,
    productsUploadDialog: {
		open: false,
    },
	productsUploadLoading: false,
};

const productsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCTS:
        {
            return {
                ...state,
                data: action.payload,
				count: action.count
            };
        }
        case Actions.SET_PRODUCTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLOSE_PRODUCTS_EXCEL_DIALOG:
        {
            return {
                ...state,
				productsUploadDialog: {open:false}
            };
        }
        case Actions.OPEN_PRODUCTS_EXCEL_DIALOG:
        {
            return {
                ...state,
				productsUploadDialog: {open:true}
            };
        }	
		case Actions.WAIT_PRODUCTS_EXCEL:
		{
			return {
				...state,
				productsUploadLoading: action.payload
			}
		}		
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
