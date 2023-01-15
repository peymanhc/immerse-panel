import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities      	: [],
    searchText    	: '',
    orderBy			: 'order',
    orderDescending	: false,
    storesDialog    : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading			: false,
	labels			: [],
	routeParams		: {},
};

const storesReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_STORES:
        { 
            return {
                ...state,
                entities   : _.keyBy(Object.keys(action.payload).map((item, i) => ({id:i+1, [item]:action.payload[item], text: action.payload[item],title: item})), 'id'),
                searchText : '',
				routeParams: action.routeParams,
            };
        }
        case Actions.GET_LABELS:
        {
            return {
                ...state,
                labels   : action.payload,
            };
        }		
        case Actions.OPEN_NEW_STORES_DIALOG:
        {
            return {
                ...state,
                storesDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_STORES_DIALOG:
        {
            return {
                ...state,
                storesDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_STORES_DIALOG:
        { 
            return {
                ...state,
                storesDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_STORES_DIALOG:
        {
            return {
                ...state,
                storesDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_STORES:
        {
            const stores = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [stores.id]: {...stores}
                }
            };
        }
        case Actions.SET_STORES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_STORES_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_STORES_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_STORES:
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

export default storesReducer;