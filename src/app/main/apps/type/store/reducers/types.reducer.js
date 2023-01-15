import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    typesDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const typesReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_TYPES:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_TYPES_DIALOG:
        {
            return {
                ...state,
                typesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_TYPES_DIALOG:
        {
            return {
                ...state,
                typesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_TYPES_DIALOG:
        { 
            return {
                ...state,
                typesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_TYPES_DIALOG:
        {
            return {
                ...state,
                typesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_TYPES:
        {
            const types = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [types.id]: {...types}
                }
            };
        }
        case Actions.SET_TYPES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_TYPES_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_TYPES_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_TYPES:
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

export default typesReducer;