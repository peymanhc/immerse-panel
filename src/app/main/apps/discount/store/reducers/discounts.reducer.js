import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const discountsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DISCOUNTS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_DISCOUNTS_SEARCH_TEXT:
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

export default discountsReducer;
