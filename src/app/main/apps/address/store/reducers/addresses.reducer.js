import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       	: [],
    users       	: [],
    searchText     	: '',
    orderBy        	: '',
    orderDescending	: false,
    routeParams    	: {},
    addressDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	cities: [],
	loading		: false,
};

const addressesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADDRESSES:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
                routeParams: action.routeParams
            };
        }
        case Actions.GET_USERS:
        {
            return {
                ...state,
                users   : action.payload,
            };
        }
        case Actions.GET_CITIES:
        {
            return {
                ...state,
                cities   : action.payload,
            };
        }
        case Actions.UPDATE_ADDRESSES:
        {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.OPEN_NEW_ADDRESS_DIALOG:
        {
            return {
                ...state,
                addressDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_ADDRESS_DIALOG:
        {
            return {
                ...state,
                addressDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ADDRESS_DIALOG:
        {
            return {
                ...state,
                addressDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ADDRESS_DIALOG:
        {
            return {
                ...state,
                addressDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.UPDATE_ADDRESS:
        {
            const address = action.payload;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [address.id]: {...address}
                }
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_ADDRESS:
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

export default addressesReducer;
