import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : '',
    orderDescending: false,
    categoryDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
	types: [],
};

const categoryLabelsReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_TYPES:
        {
            return {
                ...state,
                types   : action.payload,
            };
        }
        case Actions.GET_CATEGORYLABELS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_CATEGORYLABELS_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_CATEGORYLABELS_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CATEGORYLABELS_DIALOG:
        { 
            return {
                ...state,
                categoryDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CATEGORYLABELS_DIALOG:
        {
            return {
                ...state,
                categoryDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_CATEGORYLABELS:
        {
            const category = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [category.id]: {...category}
                }
            };
        }
        case Actions.SET_CATEGORYLABELS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_CATEGORYLABELS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_CATEGORYLABELS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_CATEGORYLABELS:
		{
			return {
				...state,
				loading: action.payload
			}
		}
        default:
            return state;
    }
};

export default categoryLabelsReducer;