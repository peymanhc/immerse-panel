import * as Actions from '../actions';

const initialState = {
    data      	: [],
    searchText	: '',
	count		: 0,
	statusRadio	: null,
    ordersMapDialog	: {
        props: {
            open: false
        },
        data : null
    },	
	masters: [],
	ordersStatus:[],
};

const ordersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ORDERS:
        {
            return {
                ...state,
                data: action.payload,
				count: action.count
            };
        }
        case Actions.GET_ORDERS_STATUS:
        {
            return {
                ...state,
                ordersStatus: action.payload.filter(({disable}) => disable === false)
            };
        }		
        case Actions.GET_MASTERS:
        {
            return {
                ...state,
                masters: action.payload
            };
        }		
        case Actions.SET_ORDERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_ORDERS_STATUS_RADIO:
        {
            return {
                ...state, 
                statusRadio: action.statusRadio
            };
        }
        case Actions.OPEN_ORDERS_DIALOG:
        {
            return {
                ...state,
                ordersMapDialog: {
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_ORDERS_DIALOG:
        {
            return {
                ...state,
                ordersMapDialog: {
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }		
        default:
        {
            return state;
        }
    }
};

export default ordersReducer;
