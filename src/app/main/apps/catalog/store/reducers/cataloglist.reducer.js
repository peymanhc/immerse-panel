import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    cataloglistDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const cataloglistReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_CATALOGLIST:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_CATALOGLIST_DIALOG:
        {
            return {
                ...state,
                cataloglistDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_CATALOGLIST_DIALOG:
        {
            return {
                ...state,
                cataloglistDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CATALOGLIST_DIALOG:
        { 
            return {
                ...state,
                cataloglistDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CATALOGLIST_DIALOG:
        {
            return {
                ...state,
                cataloglistDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_CATALOGLIST:
        {
            const cataloglist = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [cataloglist.id]: {...cataloglist}
                }
            };
        }
        case Actions.SET_CATALOGLIST_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_CATALOGLIST_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_CATALOGLIST_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_CATALOGLIST:
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

export default cataloglistReducer;
