import * as Actions from '../actions/posts';

const initialState = {
    data      : [],
    searchText: '',
	count: 0
};

const postsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TRADEPAGE:
        {
            return {
                ...state,
                data: action.payload,
				count: action.count
            };
        }
        case Actions.SET_TRADEPAGE_SEARCH_TEXT:
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

export default postsReducer;
