import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    gatewaysDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const gatewaysReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_GATEWAYS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_GATEWAYS_DIALOG:
        {
            return {
                ...state,
                gatewaysDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_GATEWAYS_DIALOG:
        {
            return {
                ...state,
                gatewaysDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_GATEWAYS_DIALOG:
        { 
            return {
                ...state,
                gatewaysDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_GATEWAYS_DIALOG:
        {
            return {
                ...state,
                gatewaysDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_GATEWAYS:
        {
            const gateways = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [gateways.id]: {...gateways}
                }
            };
        }
        case Actions.SET_GATEWAYS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_GATEWAYS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_GATEWAYS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_GATEWAYS:
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

export default gatewaysReducer;