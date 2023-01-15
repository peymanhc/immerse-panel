import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    orderBy        : 'order',
    orderDescending: false,
    ordersStatusDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    },
	loading: false,
};

const ordersStatusReducer = function (state = initialState, action) {
    switch ( action.type )
    { 
        case Actions.GET_ORDERSSTATUS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'id'),
                searchText : '',
            };
        }
        case Actions.OPEN_NEW_ORDERSSTATUS_DIALOG:
        {
            return {
                ...state,
                ordersStatusDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
		
        case Actions.CLOSE_NEW_ORDERSSTATUS_DIALOG:
        {
            return {
                ...state,
                ordersStatusDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_ORDERSSTATUS_DIALOG:
        { 
            return {
                ...state,
                ordersStatusDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_ORDERSSTATUS_DIALOG:
        {
            return {
                ...state,
                ordersStatusDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        case Actions.UPDATE_ORDERSSTATUS:
        {
            const ordersStatus = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [ordersStatus.id]: {...ordersStatus}
                }
            };
        }
        case Actions.SET_ORDERSSTATUS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_ORDERSSTATUS_ORDER_DESCENDING:
        {
            return {
                ...state,
                orderDescending: !state.orderDescending
            };
        }
        case Actions.CHANGE_ORDERSSTATUS_ORDER:
        {
            return {
                ...state,
                orderBy: action.orderBy
            };
        }
		case Actions.WAIT_ORDERSSTATUS:
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

export default ordersStatusReducer;