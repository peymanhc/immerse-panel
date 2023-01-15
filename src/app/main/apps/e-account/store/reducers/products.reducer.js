import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: '',
	count: 0
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
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
