import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const mastersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MASTERS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_MASTERS_SEARCH_TEXT:
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

export default mastersReducer;
