import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities      	: [],
    searchText    	: '',
    orderBy			: 'order',
    orderDescending	: false,
    shopsDialog    : {
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

const shopsReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_SHOPS:
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
        case Actions.OPEN_NEW_SHOPS_DIALOG:
        {
            return {
                ...state,
                shopsDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_SHOPS_DIALOG:
        {
            return {
                ...state,
                shopsDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SHOPS_DIALOG:
        { 
            return {
                ...state,
                shopsDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SHOPS_DIALOG:
        {
            return {
                ...state,
                shopsDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_SHOPS:
        {
            const shops = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [shops.id]: {...shops}
                }
            };
        }
        case Actions.SET_SHOPS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_SHOPS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_SHOPS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_SHOPS:
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

export default shopsReducer;